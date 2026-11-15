import { languages } from "./i18n/index.js";

export function initLanguageMenu({ current, onSelect }) {
  const root = document.querySelector(".lang");
  const button = root.querySelector(".lang-btn");
  const list = root.querySelector(".lang-list");
  const code = root.querySelector(".lang-code");

  list.innerHTML = languages
    .map(
      (language) =>
        `<li role="option" tabindex="-1" data-code="${language.code}" lang="${language.code}"><span class="opt-code">${language.label}</span><span class="opt-name">${language.name}</span></li>`,
    )
    .join("");
  const options = [...list.children];

  const sync = (value) => {
    code.textContent = value.toUpperCase();
    options.forEach((option) => option.setAttribute("aria-selected", String(option.dataset.code === value)));
  };

  const setOpen = (open, restoreFocus = false) => {
    list.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    if (open) (options.find((option) => option.getAttribute("aria-selected") === "true") ?? options[0]).focus();
    else if (restoreFocus) button.focus();
  };

  const move = (step) => {
    const index = options.indexOf(document.activeElement);
    options[(index + step + options.length) % options.length].focus();
  };

  button.addEventListener("click", () => setOpen(list.hidden));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(true);
  });
  list.addEventListener("click", (event) => {
    const option = event.target.closest("li");
    if (!option) return;
    onSelect(option.dataset.code);
    setOpen(false, true);
  });
  list.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      document.activeElement.click();
    } else if (event.key === "Escape") {
      setOpen(false, true);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  });
  document.addEventListener("click", (event) => !root.contains(event.target) && setOpen(false));

  sync(current);
  return { sync };
}
