//* PAGE-LOAD Scripts

// var dataStore = "";

// if (localStorage.getItem("theme")) {
//   document.documentElement.setAttribute(
//     "data-theme",
//     localStorage.getItem("theme")
//   );
// }

// fetch("https://restcountries.com/v2/all")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     dataStore = data;
//     appendData(data);
//     loadHashFromURL();
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// // This function updates the country-list
// function appendData(data) {
//   // Reset list to make it ready for new data
//   var countryList = document.getElementById("country-list");
//   countryList.innerHTML = "";

//   // Create countryCard
//   for (var i = 0; i < data.length; i++) {
//     var countryCard = document.createElement("div");
//     countryCard.classList.add("country-card");
//     countryCard.setAttribute("id", i);
//     countryCard.onclick = function (event) {
//       window.location.href =
//         "#" + data[event.currentTarget.id].name.toLowerCase();
//       findDataWithHash(data[event.currentTarget.id].name.toLowerCase());
//     };
//     countryCard.innerHTML =
//       "<img class='flag' src='" +
//       data[i].flag +
//       "'>" +
//       "<div class='stats-section'><h2 class='name'>" +
//       data[i].name +
//       "</h2>" +
//       "<div class='stats-wrap'><span class='stats-title' id='population-title'>Population: </span><span class='stats' id='population'>" +
//       getPopulation(data, i) +
//       "</span></div>" +
//       "<div class='stats-wrap'><span class='stats-title' id='region-title'>Region: </span><span class='stats' id='region'>" +
//       getRegion(data, i) +
//       "</span></div>" +
//       "<div class='stats-wrap'><span class='stats-title' id='capital-title'>Capital: </span><span class='stats' id='capital'>" +
//       getCapital(data, i) +
//       "</span></div></div>";
//     countryList.appendChild(countryCard);
//   }
// }

// // These functions makes it so the card will display "none" if any field is empty
// function getPopulation(data, i) {
//   if (data[i].population === 0) {
//     return "<span class='empty-data'>none</span>";
//   } else return data[i].population.toLocaleString();
// }
// function getRegion(data, i) {
//   if (data[i].region === "") {
//     return "<span class='empty-data'>none</span>";
//   } else return data[i].region;
// }
// function getCapital(data, i) {
//   if (!data[i].capital) {
//     return "<span class='empty-data'>none</span>";
//   } else return data[i].capital;
// }

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
    window.localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    window.localStorage.setItem("theme", "light");
  }
}

//* DROPDOWN MENU Scripts

function expandRegionMenu(event) {
  event.stopPropagation();

  // Close the autocomplete dropdown when clicked region dropdown is clicked
  document.getElementById("autocomplete-modal").style.display = "none";

  var menu = document.getElementById("region-menu");
  var activator = document.getElementById("menu-activator");

  // Makes the user able to "toggle" the dropdown by clicking it again
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

var autoCompleteArray = [];

// Takes the input value and appends the matching data
function getInputValue() {
  var value = document.getElementById("search-focus").value;
  const result = dataStore.filter((d) => d.name === value);
  if (result.length === 1) {
    appendData(result);
  } else if (result.length === 0 && autoCompleteArray.length > 0) {
    appendData(autoCompleteArray);
  } else if (result.length === 0 && autoCompleteArray.length === 0) {
    console.log("no country by that name :(");
  }
  // Reset everything
  autoCompleteArray = [];
  document.getElementById("search-focus").blur();
  document.getElementById("search-focus").value = "";
  document.getElementById("autocomplete-modal").innerHTML = "";
  document.getElementById("autocomplete-modal").style.display = "none";
  document.getElementById("menu-activator").innerText = "Filter by Region";
}

function onInputClick(event) {
  event.stopPropagation();

  // Close region menu when search input is clicked
  document.getElementById("region-menu").style.display = "none";

  // If search input has more than two characters, display autocomplete-modal
  if (document.getElementById("search-focus").value.length > 2) {
    document.getElementById("autocomplete-modal").style.display = "block";
  }
}

const onInputChange = () => {
  document.getElementById("autocomplete-modal").innerHTML = "";
  var value = document.getElementById("search-focus").value.toLowerCase();
  autoCompleteArray = [];
  // Loop through the whole dataStore (country list)
  for (var i = 0; i < dataStore.length; i++) {
    // If search input has less than two characters, do NOT display autocomplete-modal
    if (value.length < 2) {
      document.getElementById("autocomplete-modal").style.display = "none";
      // Check if dataStore[i] matches the input value. Push data into autcompleteArray for if true
    } else if (dataStore[i].name.toLowerCase().startsWith(value)) {
      document.getElementById("autocomplete-modal").style.display = "block";
      autoCompleteArray.push(dataStore[i]);
      // Make the matching letters bold
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
};

function clickToFillInput(i) {
  document.getElementById("search-focus").value = "";
  var arr = [];
  arr.push(dataStore[i]);
  appendData(arr);
  document.getElementById("autocomplete-modal").innerHTML = "";
  autoCompleteArray = [];
}

//* NAVIGATE TO NEW ROUTE

// If URL is blank, add #;) else try to find country in the URL
function loadHashFromURL() {
  if (window.location.hash == "") {
    window.location.href = "#;)";
  } else if (window.location.hash != "#;)") {
    var hash = window.location.hash.substring(1);
    findDataWithHash(hash);
  }
}

// run code above on every hashchange
window.addEventListener("hashchange", function () {
  document.body.style.overflow = "visible";
  loadHashFromURL();
});

// reset URL when closing modal
function closeModal() {
  window.location.href = "#;)";
  document.getElementById("country-modal").style.display = "none";
}

function findDataWithHash(hash) {
  const index = dataStore.findIndex(
    (data) => data.name.toLowerCase() === decodeURI(hash)
  );
  if (index === -1) {
    window.location.href = "#;)";
  } else if (hash !== "#;)") {
    var modal = document.getElementById("country-modal");
    modal.style.display = "block";
    var currencies = "";
    if (!dataStore[index].currencies) {
    } else if (dataStore[index].currencies) {
      for (var i = 0; dataStore[index].currencies.length > i; i++) {
        currencies +=
          "<span class='detail-stat'>" +
          dataStore[index].currencies[i].name +
          "</span>";
        if (dataStore[index].currencies.length - 1 > i) {
          currencies += ", ";
        }
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
    if (!dataStore[index].borders) {
      borderCountries = "<span class='empty-data'> none</span>";
    } else
      for (var i = 0; dataStore[index].borders.length > i; i++) {
        borderCountries +=
          "<button class='detail-border-country-button' onclick='goToBorderCountry(event.target)'>" +
          getCountryNameByAlphaCode3(dataStore[index].borders[i]) +
          "</button>";
      }
    document.body.style.overflow = "hidden";
    modal.innerHTML =
      "<div class='detail-container'>" +
      "<button id='back-button' onclick='closeModal()'>" +
      arrowSVG +
      "Back</button>" +
      "<div class='detail-content'><div class='detail-flag-container'><img class='detail-flag' src='" +
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
      "</span></li></ul></div><div class='detail-border-countries-container'>" +
      "<span class='detail-border-countries-title' id='border-title-1'>Border Countries:</span>" +
      "<div class='detail-border-button-section'>" +
      "<span class='detail-border-countries-title' id='border-title-2'>Border Countries:</span>" +
      borderCountries +
      "</div>" +
      "</div></div></div></div>";

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
  if (data === undefined) {
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
