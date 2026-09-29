const themeStorageKey = "portfolio-theme";

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {}

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

document.documentElement.dataset.theme = getInitialTheme();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".theme-toggle");
  const icon = toggle.querySelector(".theme-icon");

  function updateToggle() {
    const isDark = document.documentElement.dataset.theme === "dark";
    const label = `Switch to ${isDark ? "light" : "dark"} mode`;
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
    icon.textContent = isDark ? "☀" : "☾";
  }

  updateToggle();
  toggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch {}

    updateToggle();
  });
});