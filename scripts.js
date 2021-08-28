//* PAGE-LOAD Scripts

document.documentElement.setAttribute("data-theme", "light");

var dataStore = "";

fetch("https://restcountries.eu/rest/v2/all")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    dataStore = data;
    appendData(data);
    loadHashFromURL();
    console.log(dataStore[0]);
  })
  .catch(function (err) {
    console.log(err);
  });

function appendData(data) {
  document.getElementById("country-list").innerHTML = "";
  var countryCard = document.getElementById("country-list");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.classList.add("country-card");
    div.setAttribute("id", i);
    div.onclick = function (event) {
      window.location.href =
        "#" + data[event.currentTarget.id].name.toLowerCase();
      // console.log(data[event.currentTarget.id].name.toLowerCase());
      findDataWithHash(data[event.currentTarget.id].name.toLowerCase());
    };
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

// -- Close menus when click on window
window.onclick = function () {
  if ((document.getElementById("region-menu").style.display = "block")) {
    document.getElementById("region-menu").style.display = "none";
  }
  if ((document.getElementById("autocomplete-modal").style.display = "block")) {
    document.getElementById("autocomplete-modal").style.display = "none";
  }
};

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

function expandRegionMenu(event) {
  event.stopPropagation();
  document.getElementById("autocomplete-modal").style.display = "none";
  var menu = document.getElementById("region-menu");
  var activator = document.getElementById("menu-activator");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    activator.blur();
  } else menu.style.display = "block";
}

function filterByRegion(region) {
  document.getElementById("menu-activator").innerText = region;
  const result = dataStore.filter((d) => d.region == region);
  appendData(result);
}

//* INPUT Scripts

function getInputValue() {
  var value = document.getElementById("search-focus").value;
  value = value.toLowerCase();
  value = value.charAt(0).toUpperCase() + value.slice(1);
  const result = dataStore.filter((d) => d.name == value);
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
  document.getElementById("autocomplete-modal").style.display = "none";
  document.getElementById("menu-activator").innerText = "Filter by Region";
}

var autoCompleteArray = [];

function autocompleteName(event) {
  event.stopPropagation();
  document.getElementById("region-menu").style.display = "none";
  if (document.getElementById("search-focus").value.length > 2) {
    document.getElementById("autocomplete-modal").style.display = "block";
  }
  document
    .getElementById("search-focus")
    .addEventListener("input", function () {
      document.getElementById("autocomplete-modal").innerHTML = "";
      var value = document.getElementById("search-focus").value.toLowerCase();
      autoCompleteArray = [];
      for (var i = 0; i < dataStore.length; i++) {
        if (value.length < 2) {
          document.getElementById("autocomplete-modal").style.display = "none";
        } else if (dataStore[i].name.toLowerCase().startsWith(value)) {
          document.getElementById("autocomplete-modal").style.display = "block";
          autoCompleteArray.push(dataStore[i]);
          var firstSlice = dataStore[i].name.slice(0, value.length);
          var lastSlice = dataStore[i].name.slice(value.length);
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
  arr.push(dataStore[i]);
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

// NAVIGATE TO NEW ROUTE

function loadHashFromURL() {
  if (window.location.hash == "") {
    window.location.href = "#;)";
  } else if (window.location.hash != "#;)") {
    var hash = window.location.hash.substring(1);
    findDataWithHash(hash);
  }
}

function closeModal() {
  window.location.href = "#;)";
  document.getElementById("country-modal").innerHTML = "";
  document.getElementById("country-modal").style.display = "none";
  loadHashFromURL();
}

window.addEventListener("hashchange", function () {
  loadHashFromURL();
});

function findDataWithHash(hash) {
  const index = dataStore.findIndex(
    (data) => data.name.toLowerCase() === decodeURI(hash)
  );

  if (index === -1) {
    window.location.href = "#;)";
  } else if (hash != "#;)") {
    var modal = document.getElementById("country-modal");
    modal.style.display = "block";
    var currencies = "";
    for (var i = 0; dataStore[index].currencies.length > i; i++) {
      currencies +=
        "<span class='detail-stat'>" +
        dataStore[index].currencies[i].name +
        "</span>";
      if (dataStore[index].currencies.length - 1 > i) {
        currencies += ", ";
      }
    }
    var languages = "";
    for (var i = 0; dataStore[index].languages.length > i; i++) {
      languages +=
        "<span class='detail-stat'>" +
        dataStore[index].languages[i].name +
        "</span>";
      if (dataStore[index].languages.length - 1 > i) {
        languages += ", ";
      }
    }
    var borderCountries = "";
    for (var i = 0; dataStore[index].borders.length > i; i++) {
      borderCountries +=
        "<button class='detail-border-country-button'>" +
        getCountryNameByAlphaCode3(dataStore[index].borders[i]) +
        "</button>";
    }
    modal.innerHTML =
      "<button onclick='closeModal()'>Go Back</button>" +
      "<div class='detail-container'><div class='detail-flag-container'><img class='detail-flag' src='" +
      verifyData(dataStore[index].flag) +
      "'></img><div class='detail-stats-main-container'><h1>" +
      verifyData(dataStore[index].name) +
      "</h1><div class='detail-stats-container'><ul class='detail-stats-list'><li><span class='detail-stat-title'>Native Name: </span><span class='detail-stat-title'>" +
      verifyData(dataStore[index].nativeName) +
      "</span></li><li><span class='detail-stat-title'>Population: </span><span class='detail-stat-title'>" +
      verifyData(dataStore[index].population) +
      "</span></li><li><span class='detail-stat-title'>Region: </span><span class='detail-stat-title'>" +
      verifyData(dataStore[index].region) +
      "</span></li><li><span class='detail-stat-title'>Sub Region: </span><span class='detail-stat-title'>" +
      verifyData(dataStore[index].subregion) +
      "</span></li><li><span class='detail-stat-title'>Capital: </span><span class='detail-stat-title'>" +
      verifyData(dataStore[index].capital) +
      "</span></li></ul><ul class='detail-stats-list'><li><span class='detail-stat-title'>Top Level Domain: </span><span class='detail-stat-title'>" +
      verifyData(dataStore[index].topLevelDomain) +
      "</span></li><li><span class='detail-stat-title'>Currencies: </span><span class='detail-stat-title'>" +
      currencies +
      "</span></li><li><span class='detail-stat-title'>Languages: </span><span class='detail-stat-title'>" +
      languages +
      "</span></li></ul></div><div class='detail-border-countries-container'><span class='detail-border-countries-title'>Border Countries:</span>" +
      borderCountries +
      "</div></div></div></div>";

    "Country Population " + dataStore[index].population;
  }
}

function verifyData(data) {
  if (data === "") {
    return "<span class='empty-data'>none</span>";
  } else if (data === 0) {
    return "<span class='empty-data'>none</span>";
  } else if (typeof data === "number") {
    return data.toLocaleString();
  } else return data;
}

function getCountryNameByAlphaCode3(countryAc3) {
  console.log(countryAc3);
  var countryName = dataStore.find((index) => index.alpha3Code == countryAc3);
  console.log(countryName.name);
  return countryName.name;
}
