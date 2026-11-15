import { translate } from "./i18n/index.js";

const HIDE_AFTER_MS = 3200;

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {}
    field.remove();
    return copied;
  }
}

export function initCopyLinks(getLanguage) {
  const toast = document.getElementById("toast");
  let timer = 0;
  document.querySelectorAll("[data-copy]").forEach((link) => {
    link.addEventListener("click", async () => {
      const value = link.dataset.copy;
      const copied = await copyText(value);
      toast.textContent = `${translate(getLanguage(), copied ? "toast.copied" : "toast.manual")}: ${value}`;
      toast.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove("show"), HIDE_AFTER_MS);
    });
  });
}
