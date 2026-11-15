import { processItem, serviceItem, stackItem } from "./components.js";
import { services, stack, workflow } from "./content.js";
import { applyLanguage, saveLanguage, storedLanguage, translate } from "./i18n/index.js";
import { initLanguageMenu } from "./lang-menu.js";
import { startSculpture } from "./sculpture.js";
import { initTheme } from "./theme.js";

const root = document.documentElement;
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

const fill = (id, items, render) => {
  const target = document.getElementById(id);
  if (target) target.innerHTML = items.map(render).join("");
};

fill("services-list", services, serviceItem);
fill("process-list", workflow, processItem);
fill("stack-list", stack, stackItem);
if (!stack.length) document.getElementById("stack")?.remove();

document.getElementById("year").textContent = String(new Date().getFullYear());

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const themeButton = document.querySelector(".theme-btn");
let language = storedLanguage();
let sculpture = null;

const syncLabels = () => {
  const open = header.classList.contains("open");
  toggle.setAttribute("aria-label", translate(language, open ? "nav.menuClose" : "nav.menuOpen"));
  themeButton.setAttribute("aria-label", translate(language, root.dataset.theme === "light" ? "theme.toDark" : "theme.toLight"));
};

const setOpen = (open) => {
  header.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  syncLabels();
};

const menu = initLanguageMenu({ current: language, onSelect: (code) => setLanguage(code) });

function setLanguage(code) {
  if (code === language) return;
  language = code;
  saveLanguage(code);
  menu.sync(code);
  applyLanguage(code);
  syncLabels();
  if (motion.matches) return;
  document.body.classList.remove("swap-in");
  void document.body.offsetWidth;
  document.body.classList.add("swap-in");
}

initTheme((mode) => {
  sculpture?.setLight(mode === "light");
  syncLabels();
});

applyLanguage(language);
syncLabels();
root.classList.remove("i18n-wait");

toggle.addEventListener("click", () => setOpen(!header.classList.contains("open")));
header.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
document.addEventListener("keydown", (event) => event.key === "Escape" && setOpen(false));
document.addEventListener("click", (event) => !header.contains(event.target) && setOpen(false));
window.matchMedia("(min-width: 861px)").addEventListener("change", (event) => event.matches && setOpen(false));

const navLinks = [...document.querySelectorAll(".nav a")];
const spy = new IntersectionObserver(
  (entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("main section[id]").forEach((section) => spy.observe(section));

const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      reveal.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
);
document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.setProperty("--delay", `${(index % 4) * 70}ms`);
  reveal.observe(element);
});

const art = document.querySelector(".hero-art");
sculpture = startSculpture(document.getElementById("sculpture"));
if (sculpture) sculpture.setLight(root.dataset.theme === "light");
else art.classList.add("no-webgl");

const hero = document.getElementById("home");
if (sculpture && !motion.matches && window.matchMedia("(hover: hover)").matches) {
  const aim = (x, y) => {
    sculpture.setPointer(x, -y);
    hero.style.setProperty("--mx", x.toFixed(3));
    hero.style.setProperty("--my", y.toFixed(3));
  };
  hero.addEventListener("pointermove", (event) => {
    const box = hero.getBoundingClientRect();
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    aim(clamp(((event.clientX - box.left) / box.width) * 2 - 1), clamp(((event.clientY - box.top) / box.height) * 2 - 1));
  });
  hero.addEventListener("pointerleave", () => aim(0, 0));
}
