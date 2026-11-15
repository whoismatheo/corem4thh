import de from "./de.js";
import en from "./en.js";
import es from "./es.js";
import fr from "./fr.js";
import ru from "./ru.js";

export const languages = [
  { code: "en", label: "EN", name: "English", dictionary: en },
  { code: "es", label: "ES", name: "Español", dictionary: es },
  { code: "fr", label: "FR", name: "Français", dictionary: fr },
  { code: "ru", label: "RU", name: "Русский", dictionary: ru },
  { code: "de", label: "DE", name: "Deutsch", dictionary: de },
];

export const defaultLanguage = "en";

const STORAGE_KEY = "corem-lang";

const find = (code) => languages.find((language) => language.code === code);

const lookup = (dictionary, key) => key.split(".").reduce((node, part) => node?.[part], dictionary);

export function storedLanguage() {
  try {
    const code = localStorage.getItem(STORAGE_KEY);
    return find(code) ? code : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

export function saveLanguage(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {}
}

export function translate(code, key) {
  return lookup(find(code)?.dictionary, key) ?? lookup(en, key) ?? key;
}

export function applyLanguage(code) {
  document.documentElement.lang = code;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(code, element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      element.setAttribute(attribute, translate(code, key));
    });
  });
  const title = translate(code, "meta.title");
  const description = translate(code, "meta.description");
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
}
