(() => {
  const root = document.documentElement;

  // ===== THEME TOGGLE =====
  const THEME_KEY = "phonomarket-theme";
  const saved = localStorage.getItem(THEME_KEY);

  if (saved === "dark" || saved === "light") {
    root.dataset.theme = saved;
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = prefersDark ? "dark" : "light";
  }

  const themeBtn = document.querySelector("[data-theme-toggle]");
  const themeIcon = themeBtn?.querySelector("[data-theme-icon]");

  function syncThemeUI() {
    const isDark = root.dataset.theme === "dark";
    if (themeIcon) themeIcon.textContent = isDark ? "☀️" : "🌙";
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(isDark));
      themeBtn.title = isDark ? "Світла тема" : "Темна тема";
    }
  }

  syncThemeUI();

  themeBtn?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, root.dataset.theme);
    syncThemeUI();
  });

  // ===== BURGER MENU =====
  const menuBtn = document.querySelector("[data-menu-btn]");
  const nav = document.querySelector("#siteNav");

  function setMenu(open) {
    document.body.classList.toggle("nav-open", open);
    menuBtn?.setAttribute("aria-expanded", String(open));
    nav?.setAttribute("data-open", String(open));
  }

  menuBtn?.addEventListener("click", () => {
    const open = !document.body.classList.contains("nav-open");
    setMenu(open);
  });

  // Закривати меню після кліку по посиланню (на мобільних)
  document.querySelectorAll("#siteNav a").forEach((a) => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 720) setMenu(false);
    });
  });

  // ===== REVEAL ANIM =====
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("in-view"));
  }
})();
