import { processItem, serviceItem, stackItem } from "./components.js";
import { services, stack, workflow } from "./content.js";
import { startSculpture } from "./sculpture.js";

const fill = (id, items, render) => {
  const target = document.getElementById(id);
  if (target) target.innerHTML = items.map(render).join("");
};

fill("services-list", services, serviceItem);
fill("stack-list", stack, stackItem);
fill("process-list", workflow, processItem);

if (!stack.length) {
  document.getElementById("stack")?.remove();
  document.querySelector('.nav a[href="#stack"]')?.remove();
}

document.getElementById("year").textContent = String(new Date().getFullYear());

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");

const setOpen = (open) => {
  header.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "close menu" : "open menu");
};

toggle.addEventListener("click", () => setOpen(!header.classList.contains("open")));
header.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
document.addEventListener("keydown", (event) => event.key === "Escape" && setOpen(false));
document.addEventListener("click", (event) => !header.contains(event.target) && setOpen(false));
window.matchMedia("(min-width: 861px)").addEventListener("change", (event) => event.matches && setOpen(false));

const navLinks = [...document.querySelectorAll(".nav a")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href")));
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
sections.forEach((section) => section && spy.observe(section));

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
if (!startSculpture(document.getElementById("sculpture"))) art.classList.add("no-webgl");
