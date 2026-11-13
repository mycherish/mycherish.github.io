/* Share LoveIt's public theme preference; no dependency on its runtime. */
(() => {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const defaultTheme = root.dataset.defaultTheme || "auto";
  let preference = defaultTheme;
  try {
    preference = localStorage.getItem("theme") || defaultTheme;
  } catch {
    /* Storage may be disabled. */
  }
  const apply = () => {
    const dark =
      preference === "dark" || (preference !== "light" && media.matches);
    root.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector(".theme-toggle")
      ?.setAttribute("aria-pressed", String(dark));
  };
  apply();
  media.addEventListener("change", apply);
  window.addEventListener("storage", (event) => {
    if (event.key === "theme" || event.key === null) {
      preference = event.newValue || defaultTheme;
      apply();
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    toggle.hidden = false;
    apply();
    toggle.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", preference);
      } catch {
        /* Keep the current page usable. */
      }
      apply();
    });
  });
})();
