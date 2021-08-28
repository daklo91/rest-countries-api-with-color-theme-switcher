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
    // TODO: Trenger å få manipulert denne(under) til å fungere i knappene på border knappene i detail page.
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
  document.body.style.overflow = "visible";
  // document.body.style.position = "static";
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
    if (dataStore[index].borders.length < 1) {
      borderCountries = "<span class='empty-data'> none</span>";
    } else
      for (var i = 0; dataStore[index].borders.length > i; i++) {
        borderCountries +=
          "<button class='detail-border-country-button' onclick='goToBorderCountry(event.target)'>" +
          getCountryNameByAlphaCode3(dataStore[index].borders[i]) +
          "</button>";
      }
    document.body.style.overflow = "hidden";
    // document.body.style.position = "fixed";
    modal.innerHTML =
      "<div class='detail-container'>" +
      "<button id='back-button' onclick='closeModal()'>" +
      arrowSVG +
      "Back</button>" +
      "<div class='detail-flag-container'><img class='detail-flag' src='" +
      verifyData(dataStore[index].flag) +
      "'></img></div><div class='detail-stats-main-container'><h1 class='detail-page-name'>" +
      verifyData(dataStore[index].name) +
      "</h1><div class='detail-stats-container'><ul class='detail-stats-list' id='list-1'><li><span class='detail-stat-title'>Native Name: </span><span class='detail-stat-text'>" +
      verifyData(dataStore[index].nativeName) +
      "</span></li><li><span class='detail-stat-title'>Population: </span><span class='detail-stat-text'>" +
      verifyData(dataStore[index].population) +
      "</span></li><li><span class='detail-stat-title'>Region: </span><span class='detail-stat-text'>" +
      verifyData(dataStore[index].region) +
      "</span></li><li><span class='detail-stat-title'>Sub Region: </span><span class='detail-stat-text'>" +
      verifyData(dataStore[index].subregion) +
      "</span></li><li><span class='detail-stat-title'>Capital: </span><span class='detail-stat-text'>" +
      verifyData(dataStore[index].capital) +
      "</span></li></ul><ul class='detail-stats-list id='list-2''><li><span class='detail-stat-title'>Top Level Domain: </span><span class='detail-stat-text'>" +
      verifyData(dataStore[index].topLevelDomain) +
      "</span></li><li><span class='detail-stat-title'>Currencies: </span><span class='detail-stat-text'>" +
      currencies +
      "</span></li><li><span class='detail-stat-title'>Languages: </span><span class='detail-stat-text'>" +
      languages +
      "</span></li></ul></div><div class='detail-border-countries-container'><span class='detail-border-countries-title'>Border Countries:</span>" +
      borderCountries +
      "</div></div></div>";

    "Country Population " + dataStore[index].population;
  }
}

var arrowSVG =
  "<svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z' fill='#111517'/></svg>";

function goToBorderCountry(event) {
  window.location.href = "#" + event.innerText.toLowerCase();
  findDataWithHash(event.innerText.toLowerCase());
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
  var countryName = dataStore.find((index) => index.alpha3Code == countryAc3);
  return countryName.name;
}
