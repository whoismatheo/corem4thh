const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

export const splitWords = (root = document) => {
  root.querySelectorAll("[data-split]").forEach((element) => {
    const words = element.textContent.trim().split(/\s+/);
    element.innerHTML = words
      .map((word, i) => `<span class="w"><span class="wi" style="--i:${i}">${word}</span></span>`)
      .join(" ");
  });
};

export function initReveal() {
  const targets = document.querySelectorAll("[data-r]");
  if (!("IntersectionObserver" in window)) return targets.forEach((el) => el.classList.add("in"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }),
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );
  targets.forEach((el) => io.observe(el));
}

export function initNav({ onActive } = {}) {
  const header = document.querySelector(".site-header");
  const nav = header.querySelector(".nav");
  const indicator = nav.querySelector(".nav-ind");
  const links = [...nav.querySelectorAll("a")];
  let active = null;

  const place = (link) => {
    if (!link) return indicator.classList.remove("on");
    const box = nav.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    indicator.style.setProperty("--x", `${(rect.left - box.left).toFixed(1)}px`);
    indicator.style.setProperty("--w", rect.width.toFixed(1));
    indicator.classList.add("on");
  };
  const setActive = (id) => {
    active = links.find((link) => link.getAttribute("href") === `#${id}`) ?? null;
    links.forEach((link) => (link === active ? link.setAttribute("aria-current", "true") : link.removeAttribute("aria-current")));
    place(active);
    onActive?.(id);
  };

  links.forEach((link) => {
    link.addEventListener("pointerenter", () => fine.matches && place(link));
    link.addEventListener("focus", () => place(link));
    link.addEventListener("pointerleave", () => place(active));
    link.addEventListener("blur", () => place(active));
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"))?.querySelector(".rule");
      if (!target) return;
      setTimeout(() => {
        target.classList.remove("ping");
        void target.offsetWidth;
        target.classList.add("ping");
      }, reduced.matches ? 0 : 520);
    });
  });

  const spy = new IntersectionObserver(
    (entries) => entries.filter((e) => e.isIntersecting).forEach((e) => setActive(e.target.id === "home" ? "" : e.target.id)),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  document.querySelectorAll("main section[id]").forEach((section) => spy.observe(section));

  let queued = false;
  const progress = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.style.setProperty("--prog", (max > 0 ? Math.min(1, window.scrollY / max) : 0).toFixed(4));
  };
  window.addEventListener("scroll", () => !queued && ((queued = true), requestAnimationFrame(progress)), { passive: true });
  window.addEventListener("resize", () => place(active));
  progress();
  return { refresh: () => place(active) };
}

export function initHero() {
  const hero = document.getElementById("home");
  const svg = hero.querySelector(".schem");
  svg.querySelectorAll(".grp").forEach((group) => {
    const g = Number(group.dataset.g);
    group.querySelectorAll(".dr").forEach((el, i) => el.style.setProperty("--d", `${180 + g * 240 + i * 22}ms`));
    group.querySelectorAll(".tx").forEach((el, i) => el.style.setProperty("--d", `${700 + g * 240 + i * 30}ms`));
  });
  hero.style.setProperty("--base", ".25s");

  const start = () => requestAnimationFrame(() => hero.classList.add("go"));
  Promise.race([document.fonts?.ready, new Promise((resolve) => setTimeout(resolve, 900))]).then(start, start);

  const clock = svg.querySelector("#clk");
  const marker = svg.querySelector("#mk");
  const wave = svg.querySelector(".wave");
  const depths = [...svg.querySelectorAll("[data-depth]")].map((el) => [el, Number(el.dataset.depth)]);
  const length = wave?.getTotalLength?.() ?? 0;
  let second = -1;
  let frame = 0;
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;

  const tick = (time) => {
    const now = new Date();
    if (now.getUTCSeconds() !== second && clock) {
      second = now.getUTCSeconds();
      clock.textContent = now.toISOString().slice(11, 19);
    }
    if (length && marker) {
      const point = wave.getPointAtLength(((time / 9000) % 1) * length);
      marker.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);
    }
    px += (tx - px) * 0.07;
    py += (ty - py) * 0.07;
    depths.forEach(([el, depth]) => (el.style.transform = `translate(${(px * depth * 3).toFixed(2)}px,${(py * depth * 3).toFixed(2)}px)`));
    frame = requestAnimationFrame(tick);
  };

  if (reduced.matches) {
    if (clock) clock.textContent = new Date().toISOString().slice(11, 19);
    if (length && marker) {
      const point = wave.getPointAtLength(length * 0.62);
      marker.setAttribute("transform", `translate(${point.x} ${point.y})`);
    }
    return;
  }

  if (fine.matches) {
    hero.addEventListener("pointermove", (event) => {
      const box = hero.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1));
      ty = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1));
    });
    hero.addEventListener("pointerleave", () => ((tx = 0), (ty = 0)));
  }

  new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(frame);
    if (entry.isIntersecting) frame = requestAnimationFrame(tick);
  }).observe(hero);
}

export function initCursor() {
  if (!fine.matches || reduced.matches) return;
  const ring = document.createElement("div");
  ring.className = "cursor";
  ring.setAttribute("aria-hidden", "true");
  document.body.append(ring);
  let x = 0;
  let y = 0;
  let cx = 0;
  let cy = 0;
  let running = false;
  const loop = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    ring.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
    if (Math.abs(x - cx) + Math.abs(y - cy) > 0.3) requestAnimationFrame(loop);
    else running = false;
  };
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    x = event.clientX;
    y = event.clientY;
    if (!ring.classList.contains("on")) ((cx = x), (cy = y), ring.classList.add("on"));
    if (!running) ((running = true), requestAnimationFrame(loop));
    const hot = event.target.closest?.("a,button,[role=option]");
    ring.classList.toggle("link", Boolean(hot));
    ring.classList.toggle("card", Boolean(hot?.classList.contains("svc")));
  });
  document.addEventListener("pointerleave", () => ring.classList.remove("on"));
  window.addEventListener("pointerdown", () => ring.classList.add("press"));
  window.addEventListener("pointerup", () => ring.classList.remove("press"));
}

export function initTouchLive() {
  if (fine.matches || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.target.classList.toggle("live", entry.isIntersecting)),
    { rootMargin: "-38% 0px -38% 0px" },
  );
  document.querySelectorAll(".svc").forEach((card) => io.observe(card));
}
