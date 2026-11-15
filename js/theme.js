const STORAGE_KEY = "corem-theme";
const COLORS = { dark: "#07070c", light: "#f4f3fa" };

export function initTheme(onChange) {
  const root = document.documentElement;
  const button = document.querySelector(".theme-btn");
  const meta = document.querySelector('meta[name="theme-color"]');
  const current = () => (root.dataset.theme === "light" ? "light" : "dark");

  const paint = () => meta?.setAttribute("content", COLORS[current()]);

  button.addEventListener("click", () => {
    const next = current() === "light" ? "dark" : "light";
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    paint();
    onChange(next);
    setTimeout(() => root.classList.remove("theme-anim"), 500);
  });

  paint();
  onChange(current());
  return { current };
}
