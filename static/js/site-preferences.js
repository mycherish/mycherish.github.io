/* Shared by the blog, directory and product templates. */
(() => {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const valid = (value) => ["light", "dark", "auto"].includes(value);
  const fallback = valid(root.dataset.defaultTheme)
    ? root.dataset.defaultTheme
    : "auto";
  let preference = fallback;
  try {
    const saved = localStorage.getItem("theme");
    if (valid(saved)) preference = saved;
  } catch {
    /* Storage is optional. */
  }
  const apply = () => {
    const effective =
      preference === "auto" ? (media.matches ? "dark" : "light") : preference;
    root.dataset.theme = effective;
    root.dataset.themePreference = preference;
    if (document.body) document.body.setAttribute("theme", effective);
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.themeChoice === preference),
      );
    });
  };
  const choose = (value) => {
    if (!valid(value)) return;
    preference = value;
    try {
      localStorage.setItem("theme", value);
    } catch {
      /* Keep this page usable. */
    }
    apply();
  };
  window.sitePreferences = { apply, choose };
  apply();
  media.addEventListener("change", apply);
  window.addEventListener("storage", (event) => {
    if (event.key === "theme" || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : fallback;
      apply();
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const menus = [...document.querySelectorAll("[data-site-tools] details")];
    const close = (menu) => {
      menu.open = false;
    };
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        choose(button.dataset.themeChoice);
        const menu = button.closest("details");
        close(menu);
        menu.querySelector("summary").focus();
      });
    });
    menus.forEach((menu) => {
      menu.addEventListener("toggle", () => {
        if (menu.open) menus.filter((other) => other !== menu).forEach(close);
      });
    });
    document.addEventListener("click", (event) =>
      menus.forEach((menu) => {
        if (menu.open && !menu.contains(event.target)) close(menu);
      }),
    );
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape")
        menus.forEach((menu) => {
          if (menu.open) {
            close(menu);
            menu.querySelector("summary").focus();
          }
        });
    });
    apply();
  });
})();
