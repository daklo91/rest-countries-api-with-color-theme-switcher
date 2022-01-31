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
fetch("https://restcountries.com/v2/all")
    .then(function (response) {
    return response.json();
})
    .then(function (countries) {
    appendData(countries);
})["catch"](function (err) {
    console.log(err);
});
var appendData = function (countries) {
    console.log(countries);
    var countryList = document.getElementById("country-list");
    countryList.innerHTML = "";
    countries.map(function (country) {
        var countryCard = document.createElement("div");
        countryCard.classList.add("country-card");
        countryCard.innerHTML =
            "<img class='flag' src='" +
                country.flag +
                "'>" +
                "<div class='stats-section'><h2 class='name'>" +
                country.name +
                "</h2>" +
                "<div class='stats-wrap'><span class='stats-title' id='population-title'>Population: </span><span class='stats' id='population'>" +
                getPopulation(country.population) +
                "</span></div>" +
                "<div class='stats-wrap'><span class='stats-title' id='region-title'>Region: </span><span class='stats' id='region'>" +
                getRegion(country.region) +
                "</span></div>" +
                "<div class='stats-wrap'><span class='stats-title' id='capital-title'>Capital: </span><span class='stats' id='capital'>" +
                getCapital(country.capital) +
                "</span></div></div>";
        countryList.appendChild(countryCard);
    });
};
var getPopulation = function (population) {
    if (population === 0) {
        return "<span class='empty-data'>none</span>";
    }
    else
        return population.toLocaleString();
};
var getRegion = function (region) {
    if (region === "") {
        return "<span class='empty-data'>none</span>";
    }
    else
        return region;
};
var getCapital = function (capital) {
    if (capital) {
        return "<span class='empty-data'>none</span>";
    }
    else
        return capital;
};
