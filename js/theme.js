const STORAGE_KEY = "corem-theme";
const COLORS = { dark: "#131416", light: "#ecece8" };

export function initTheme(onChange) {
  const root = document.documentElement;
  const button = document.querySelector(".theme-btn");
  const meta = document.querySelector('meta[name="theme-color"]');
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const current = () => (root.dataset.theme === "light" ? "light" : "dark");

  const paint = () => meta?.setAttribute("content", COLORS[current()]);
  const apply = (next) => {
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    paint();
    onChange(next);
  };

  button.addEventListener("click", () => {
    const next = current() === "light" ? "dark" : "light";
    button.classList.remove("flip");
    void button.offsetWidth;
    button.classList.add("flip");
    if (reduced.matches) return apply(next);
    if (!document.startViewTransition) {
      root.classList.add("theme-anim");
      apply(next);
      return void setTimeout(() => root.classList.remove("theme-anim"), 500);
    }
    const box = button.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => apply(next));
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
  });

  paint();
  onChange(current());
  return { current };
}
