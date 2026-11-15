const n = (v) => Number(v.toFixed(1));
const path = (d, cls = "") => `<path class="dr ${cls}" pathLength="1" d="${d}"/>`;
const line = (x1, y1, x2, y2, cls = "") => path(`M${x1} ${y1}L${x2} ${y2}`, cls);
const rect = (x, y, w, h, cls = "") => `<rect class="dr ${cls}" pathLength="1" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const text = (x, y, value, cls = "", anchor = "start", id = "") =>
  `<text class="tx ${cls}" x="${x}" y="${y}" text-anchor="${anchor}" font-size="8.5"${id ? ` id="${id}"` : ""}>${value}</text>`;
const arrowR = (x, y) => path(`M${x - 5} ${y - 3}L${x} ${y}L${x - 5} ${y + 3}`, "hv");
const arrowU = (x, y) => path(`M${x - 3} ${y + 5}L${x} ${y}L${x + 3} ${y + 5}`, "hv");
const arrowD = (x, y) => path(`M${x - 3} ${y - 5}L${x} ${y}L${x + 3} ${y - 5}`, "hv");
const group = (g, depth, body) => `<g class="grp" data-g="${g}" data-depth="${depth}">${body}</g>`;

const box = (x, y, w, h, label) => rect(x, y, w, h, "hv") + text(x + w / 2, y + h / 2 + 3, label, "b", "middle");

const ruler = () => {
  let out = "";
  for (let x = 10; x <= 550; x += 20) out += path(`M${x} 10v${(x - 10) % 100 === 0 ? 9 : 5}`);
  for (let y = 30; y <= 630; y += 20) out += path(`M10 ${y}h${(y - 10) % 100 === 0 ? 9 : 5}`);
  [0, 1, 2, 3, 4, 5].forEach((k) => (out += text(10 + k * 100, 32, String(k * 100).padStart(3, "0"), "", "middle")));
  return out;
};

const wavePath = (() => {
  let d = "";
  for (let x = 0; x <= 280; x += 4) {
    const y = 100 - 26 * Math.sin(x / 22) - 12 * Math.sin(x / 7 + 1) - 8 * Math.sin(x / 41);
    d += `${x ? "L" : "M"}${44 + x} ${n(430 + y * 0.8)}`;
  }
  return d;
})();

export const schematic = () => `<svg class="schem" viewBox="0 0 560 640" role="img" aria-label="System architecture schematic" preserveAspectRatio="xMidYMid meet">
${group(0, 0, rect(10, 10, 540, 620, "hv") + ruler())}
${group(1, 1, `
 ${text(30, 62, "A · ARCHITECTURE", "b")}
 ${box(30, 80, 92, 44, "CLIENT")}${box(234, 80, 92, 44, "API")}${box(438, 80, 92, 44, "DB")}
 ${line(122, 102, 234, 102)}${arrowR(234, 102)}${line(326, 102, 438, 102)}${arrowR(438, 102)}
 ${text(178, 96, "HTTPS", "", "middle")}${text(382, 96, "SQL", "", "middle")}
 ${line(244, 124, 244, 164)}${arrowD(244, 164)}${line(316, 124, 316, 164)}${arrowD(316, 164)}
 ${box(212, 164, 64, 30, "AUTH")}${box(284, 164, 64, 30, "FILES")}
 ${box(30, 164, 92, 30, "GIT")}${line(76, 164, 76, 124)}${arrowU(76, 124)}${text(86, 148, "DEPLOY")}
 ${line(30, 222, 530, 222)}${path("M35 219L30 222L35 225", "hv")}${line(30, 216, 30, 228)}${line(530, 216, 530, 228)}${arrowR(530, 222).replace("hv", "")}${text(280, 225, "500", "b", "middle")}
 <path class="flow" d="M122 102H234M326 102H438"/><path class="flow" d="M244 124V164M316 124V164"/>
`)}
${group(2, 1.6, `
 ${rect(30, 250, 240, 150, "hv")}${text(42, 268, "B · STATUS", "b")}
 ${[["STATUS", "ready"], ["RUNTIME", "edge"], ["DATABASE", "postgres"], ["DEPLOY", "vercel"]]
   .map(([k, v], i) => line(30, 276 + i * 22, 270, 276 + i * 22) + text(42, 292 + i * 22, k) + text(258, 292 + i * 22, v, "b", "end"))
   .join("")}
 ${line(30, 364, 270, 364)}${text(42, 384, "UTC")}${text(258, 384, "00:00:00", "b", "end", "clk")}
 ${rect(290, 250, 240, 150, "hv")}${text(302, 268, "C · SOURCE", "b")}
 ${["const explore = (idea) => {", "  return idea", "    .design()", "    .build()", "    .ship();", "};"]
   .map((s, i) => text(322, 296 + i * 15, s.replace(/ /g, "\u00a0"), i === 0 ? "b" : "") + text(310, 296 + i * 15, String(i + 1), "n", "end"))
   .join("")}
 <rect class="caret" x="${322 + 6 * 5.4}" y="${296 + 5 * 15 - 9}" width="1.6" height="10"/>
`)}
${group(3, 2.4, `
 ${rect(30, 424, 300, 150, "hv")}${text(42, 442, "D · SIGNAL", "b")}
 ${[0, 1, 2].map((i) => line(30, 462 + i * 30, 330, 462 + i * 30, "g")).join("")}
 ${path(wavePath, "hv wave")}<circle class="mk" id="mk" r="3" cx="0" cy="0"/>
 ${text(42, 566, "T0")}${text(318, 566, "T1", "", "end")}
 ${rect(350, 424, 180, 150, "hv")}${text(362, 442, "E · TOLERANCE", "b")}
 <g transform="translate(440 506)">${path("M-38 0a38 38 0 1 0 76 0a38 38 0 1 0 -76 0", "hv")}${line(-58, 0, 58, 0)}${line(0, -58, 0, 58)}
 <g class="spin">${path("M-46 0a46 46 0 1 0 92 0a46 46 0 1 0 -92 0", "dash")}</g>${line(0, 0, 27, -27, "hv")}${text(34, -30, "R38", "b")}</g>
`)}
${group(4, 0.6, `
 ${rect(30, 588, 500, 30, "hv")}${line(160, 588, 160, 618)}${line(290, 588, 290, 618)}${line(410, 588, 410, 618)}
 ${text(42, 607, "corem4thh", "b")}${text(172, 607, "FIG. 01 / SYSTEM")}${text(302, 607, "SCALE 1:1")}${text(422, 607, "SHEET 01/01")}
`)}
</svg>`;
