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
    window.location.href = "#";
  } else var hash = window.location.hash.substring(1);
  findDataWithHash(hash);
}

function findDataWithHash(hash) {
  const index = dataStore.findIndex(
    (data) => data.name.toLowerCase() === decodeURI(hash)
  );
  console.log(index);

  var modal = document.getElementById("country-modal");
  modal.innerText =
    "Country Name " +
    dataStore[index].name +
    "Country Population " +
    dataStore[index].population;
}
