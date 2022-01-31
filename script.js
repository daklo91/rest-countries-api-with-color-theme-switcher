var theme = window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
document.documentElement.setAttribute("data-theme", theme);
var setTheme = function (themeParam) {
    theme = themeParam;
    document.documentElement.setAttribute("data-theme", themeParam);
    window.localStorage.setItem("theme", themeParam);
};
var toggleTheme = function () {
    if (theme === "dark") {
        setTheme("light");
    }
    else if (theme === "light") {
        setTheme("dark");
    }
};
var darkModeButton = "\n<button class=\"dark-mode-button\" onclick=\"toggleTheme()\" aria-label=\"dark mode toggle\">\n  <svg\n    class=\"dark-mode-icon\"\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 16 16\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\">\n      <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M10.8426 11.052C7.73486 11.052 5.21543 8.74226 5.21543 5.89457C5.21543 4.82024 5.57343 3.82526 6.18514 3C3.75229 3.75612 2 5.86498 2 8.35045C2 11.4708 4.75943 14 8.16286 14C10.8743 14 13.1757 12.3945 14 10.1636C13.1 10.7238 12.0129 11.052 10.8426 11.052Z\"\n      fill=\"none\"\n      stroke=\"none\"\n      stroke-width=\"none\"/>\n  </svg> \n  <span class=\"dark-mode-text\">Dark Mode</span>\n</button>\n";
var header = function () {
    return "\n  <header>\n    <a href=\"/\" aria-label=\"go to homepage\"><h1 class=\"logo\">Where in the world?</h1></a>\n    ".concat(darkModeButton, "\n  </header>");
};
document.body.insertAdjacentHTML("afterbegin", header());
var fetchCountryURL = "https://restcountries.com/v3.1/all";
var countries = [];
fetch(fetchCountryURL)
    .then(function (response) { return response.json(); })
    .then(function (data) {
    return data.map(function (object) {
        countries.push({
            name: object.name.common,
            population: object.population
        });
    });
})
    .then(console.log(countries));
var countryList = "\n  <ul id=\"country-list\">\n    \n  </ul>\n";
document.body.insertAdjacentHTML("beforeend", countryList);
