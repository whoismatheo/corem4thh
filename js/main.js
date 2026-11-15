import { serviceItem, techGroup } from "./components.js";
import { services, stack } from "./content.js";
import { initCopyLinks } from "./copy.js";
import { applyLanguage, saveLanguage, storedLanguage, translate } from "./i18n/index.js";
import { initLanguageMenu } from "./lang-menu.js";
import { initCursor, initHero, initNav, initReveal, initTouchLive, splitWords } from "./motion.js";
import { schematic } from "./schematic.js";
import { initTheme } from "./theme.js";

window.__corem = true;
const root = document.documentElement;
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

const fill = (id, html) => {
  const target = document.getElementById(id);
  if (target) target.innerHTML = html;
};

fill("services-list", services.map(serviceItem).join(""));
let offset = 0;
fill(
  "stack-list",
  stack
    .map((group, index) => {
      const html = techGroup(group, index, offset);
      offset += group.items.length;
      return html;
    })
    .join(""),
);
fill("schematic", schematic());
document.getElementById("year").textContent = String(new Date().getFullYear());

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const themeButton = document.querySelector(".theme-btn");
let language = storedLanguage();

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
const nav = initNav();

const render = () => {
  applyLanguage(language);
  splitWords();
  syncLabels();
  nav.refresh();
};

function setLanguage(code) {
  if (code === language) return;
  language = code;
  saveLanguage(code);
  menu.sync(code);
  render();
  if (motion.matches) return;
  document.body.classList.remove("swap-in");
  void document.body.offsetWidth;
  document.body.classList.add("swap-in");
}

initTheme(syncLabels);
render();
root.classList.remove("i18n-wait");
document.fonts?.ready.then(() => nav.refresh());

toggle.addEventListener("click", () => setOpen(!header.classList.contains("open")));
header.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
document.addEventListener("keydown", (event) => event.key === "Escape" && setOpen(false));
document.addEventListener("click", (event) => !header.contains(event.target) && setOpen(false));
window.matchMedia("(min-width: 861px)").addEventListener("change", (event) => event.matches && setOpen(false));

initCopyLinks(() => language);
initReveal();
initHero();
initCursor();
initTouchLive();
