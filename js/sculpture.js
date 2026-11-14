const VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float ring(vec3 p,float R,float r){return length(vec2(length(p.xz)-R,p.y))-r;}
float map(vec3 p){
  p.xz*=rot(uTime*.16);
  p.yz*=rot(1.05);
  float d=ring(p,1.,.12);
  vec3 b=p-vec3(.9,0.,0.);
  b.yz*=rot(uTime*.32+.6);
  d=min(d,ring(vec3(b.x,b.z,b.y),.75,.09));
  vec3 c=p+vec3(.9,0.,0.);
  c.yz*=rot(-uTime*.24+2.1);
  d=min(d,ring(vec3(c.x,c.z,c.y),.75,.09));
  return d;
}
vec3 env(vec3 r){
  float h=r.y*.5+.5;
  vec3 c=mix(vec3(.02,.022,.022),vec3(.86,.89,.89),pow(h,1.6));
  c+=vec3(1.)*smoothstep(.86,.97,dot(r,normalize(vec3(.45,.75,.4))))*1.5;
  c+=vec3(.95)*smoothstep(.9,.985,dot(r,normalize(vec3(-.9,.1,.45))))*1.1;
  c+=vec3(.7)*smoothstep(.88,.98,dot(r,normalize(vec3(.8,-.1,.6))))*.7;
  c*=.78+.22*smoothstep(-.2,.35,sin(r.x*5.+r.y*2.5));
  c=mix(c,vec3(.015),smoothstep(.25,-.45,r.y)*.85);
  return c;
}
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-uRes)/min(uRes.x,uRes.y);
  vec3 ro=vec3(0.,0.,4.15);
  vec3 rd=normalize(vec3(uv,-2.));
  float t=0.;
  float hit=0.;
  for(int i=0;i<72;i++){
    float d=map(ro+rd*t);
    if(d<.002){hit=1.;break;}
    t+=d;
    if(t>9.)break;
  }
  if(hit<.5){gl_FragColor=vec4(0.);return;}
  vec3 p=ro+rd*t;
  vec2 e=vec2(.0025,0.);
  vec3 n=normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));
  float fr=pow(1.-max(dot(n,-rd),0.),3.);
  vec3 col=env(reflect(rd,n))*vec3(.9,.93,.93);
  col=pow(mix(col*.85,col,fr)+fr*.1,vec3(.76));
  gl_FragColor=vec4(col,1.);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function startSculpture(canvas) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return false;
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return false;
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "uRes");
  const time = gl.getUniformLocation(program, "uTime");
  gl.clearColor(0, 0, 0, 0);

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = true;
  let frame = 0;
  let last = 0;

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 1.5, 900 / Math.max(box.width, 1));
    const width = Math.max(1, Math.round(box.width * scale));
    const height = Math.max(1, Math.round(box.height * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
  };

  const draw = (seconds) => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform1f(time, seconds);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const loop = (now) => {
    frame = requestAnimationFrame(loop);
    if (now - last < 33) return;
    last = now;
    draw(now / 1000);
  };

  const update = () => {
    cancelAnimationFrame(frame);
    resize();
    if (motion.matches || !visible || document.hidden) draw(3.2);
    else frame = requestAnimationFrame(loop);
  };

  new ResizeObserver(update).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }).observe(canvas);
  document.addEventListener("visibilitychange", update);
  motion.addEventListener("change", update);
  update();
  return true;
}
