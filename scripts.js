//PAGE-LOAD Scripts

document.documentElement.setAttribute("data-theme", "light");

var filterToData = "";

fetch("https://restcountries.eu/rest/v2/all")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    filterToData = data;
    appendData(data);
  })
  .catch(function (err) {
    console.log("Something went wrong: " + err);
  });

function appendData(data) {
  document.getElementById("country-list").innerHTML = "";
  var mainContainer = document.getElementById("country-list");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.classList.add("country-card");
    div.innerHTML =
      "<img class='flag' src='" +
      data[i].flag +
      "'>" +
      "<div class='stats-section'><h2 class='name'>" +
      data[i].name +
      "</h2>" +
      "<div class='stats-wrap'><span class='stats-title' id='population-title'>Population: </span><span class='stats' id='population'>" +
      getPopulation(data, i) +
      "</span></div>" +
      "<div class='stats-wrap'><span class='stats-title' id='region-title'>Region: </span><span class='stats' id='region'>" +
      getRegion(data, i) +
      "</span></div>" +
      "<div class='stats-wrap'><span class='stats-title' id='capital-title'>Capital: </span><span class='stats' id='capital'>" +
      getCapital(data, i) +
      "</span></div></div>";
    mainContainer.appendChild(div);
  }
}

function getPopulation(data, loopNumber) {
  if (data[loopNumber].population === 0) {
    return "<span class='empty-data'>none</span>";
  } else return data[loopNumber].population.toLocaleString();
}
function getRegion(data, loopNumber) {
  if (data[loopNumber].region === "") {
    return "<span class='empty-data'>none</span>";
  } else return data[loopNumber].region;
}
function getCapital(data, loopNumber) {
  if (data[loopNumber].capital === "") {
    return "<span class='empty-data'>none</span>";
  } else return data[loopNumber].capital;
}

// DARKMODE Scripts

let darkMode = false;

function switchTheme() {
  darkMode = !darkMode;
  if (darkMode === true) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

// DROPDOWN MENU Scripts

function expandRegionMenu() {
  var x = document.getElementById("region-menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else x.style.display = "block";
}

function closeRegionMenu() {
  var x = document.getElementById("region-menu");
  setTimeout(function () {
    x.style.display = "none";
  }, 150);
}

function grabText(region) {
  let text = document.getElementById(region).textContent;
  document.getElementById("menu-activator-text").textContent = text;
  var filterRegion = region.slice(0, -7);
  filterRegion = filterRegion.charAt(0).toUpperCase() + filterRegion.slice(1);
  filterTest(filterRegion);
}

function filterTest(text) {
  if (text == "America") {
    text = "Americas";
  }
  const result = filterToData.filter((t) => t.region == text);
  appendData(result);
}

//INPUT Scripts

//TODO: Create Autocomplete for better UX and error message if a country does not match the search
//TODO: Make search button on phones functional

function getInputValue() {
  var value = document.getElementById("search-focus").value;
  value = value.toLowerCase();
  value = value.charAt(0).toUpperCase() + value.slice(1);
  const result = filterToData.filter((t) => t.name == value);
  if (result.length > 0) {
    appendData(result);
    document.getElementById("search-focus").value = "";
  } else console.log("Something went wrong");
}
