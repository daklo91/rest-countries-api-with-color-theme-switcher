let theme = window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
document.documentElement.setAttribute("data-theme", theme);

const setTheme = (themeParam: "dark" | "light") => {
  theme = themeParam;
  document.documentElement.setAttribute("data-theme", themeParam);
  window.localStorage.setItem("theme", themeParam);
};

const toggleTheme = () => {
  if (theme === "dark") {
    setTheme("light");
  } else if (theme === "light") {
    setTheme("dark");
  }
};
