//* PAGE-LOAD Scripts

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
  var countryCard = document.getElementById("country-list");
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
    countryCard.appendChild(div);
  }
}

function getPopulation(data, i) {
  if (data[i].population === 0) {
    return "<span class='empty-data'>none</span>";
  } else return data[i].population.toLocaleString();
}
function getRegion(data, i) {
  if (data[i].region === "") {
    return "<span class='empty-data'>none</span>";
  } else return data[i].region;
}
function getCapital(data, i) {
  if (data[i].capital === "") {
    return "<span class='empty-data'>none</span>";
  } else return data[i].capital;
}

//* DARKMODE Scripts

let darkMode = false;

function switchTheme() {
  darkMode = !darkMode;
  if (darkMode === true) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

//* DROPDOWN MENU Scripts

function expandRegionMenu() {
  var menu = document.getElementById("region-menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else menu.style.display = "block";
}

function closeRegionMenu() {
  var x = (document.getElementById("region-menu").style.display = "none");
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

//* INPUT Scripts

function getInputValue() {
  var value = document.getElementById("search-focus").value;
  value = value.toLowerCase();
  value = value.charAt(0).toUpperCase() + value.slice(1);
  const result = filterToData.filter((t) => t.name == value);
  if (result.length == 1) {
    appendData(result);
  } else if (result.length == 0 && autoCompleteArray.length > 0) {
    appendData(autoCompleteArray);
  } else if (result.length == 0 && autoCompleteArray.length == 0) {
    console.log("no country by that name :(");
  }
  autoCompleteArray = [];
  document.getElementById("search-focus").blur();
  document.getElementById("search-focus").value = "";
  document.getElementById("autocomplete-modal").innerHTML = "";
}

//On the modal below the input search
var autoCompleteArray = [];

function autocompleteName() {
  document
    .getElementById("search-focus")
    .addEventListener("input", function (e) {
      document.getElementById("autocomplete-modal").innerHTML = "";
      var val = document.getElementById("search-focus").value.toLowerCase();
      autoCompleteArray = [];
      for (var i = 0; i < filterToData.length; i++) {
        if (val.length < 2) {
          document.getElementById("autocomplete-modal").innerHTML = "";
        } else if (filterToData[i].name.toLowerCase().startsWith(val)) {
          document.getElementById("autocomplete-modal").style.display = "block";
          autoCompleteArray.push(filterToData[i]);
          var firstSlice = filterToData[i].name.slice(0, val.length);
          var lastSlice = filterToData[i].name.slice(val.length);
          document.getElementById("autocomplete-modal").innerHTML +=
            "<li class='autocomplete-name' onclick='clickToFillInput(" +
            i +
            ")'>" +
            "<strong>" +
            firstSlice +
            "</strong>" +
            lastSlice +
            "</li>";
        }
      }
    });
}

function clickToFillInput(i) {
  document.getElementById("search-focus").value = "";
  var arr = [];
  arr.push(filterToData[i]);
  appendData(arr);
  document.getElementById("autocomplete-modal").innerHTML = "";
  autoCompleteArray = [];
}

function hideShowModal() {
  if (
    document.activeElement === document.getElementById("search-focus") &&
    autoCompleteArray.length > 0
  ) {
    document.getElementById("autocomplete-modal").style.display = "block";
  } else
    setTimeout(function () {
      document.getElementById("autocomplete-modal").style.display = "none";
    }, 150);
}
