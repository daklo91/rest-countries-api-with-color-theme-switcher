//PAGE-LOAD Scripts

document.documentElement.setAttribute("data-theme", "light");

fetch("https://restcountries.eu/rest/v2/all")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    appendData(data);
  })
  .catch(function (err) {
    console.log("Something went wrong: " + err);
  });

// TODO: Remove Capital if there is no Capital (Antarctica doesn't have a capital)

function appendData(data) {
  var mainContainer = document.getElementById("country-list");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.classList.add("country-card");
    div.innerHTML =
      "<img class='flag' src='" +
      data[i].flag +
      "'>" +
      "<h2 class='name'>" +
      data[i].name +
      "</h2>" +
      "<span>Population: " +
      data[i].population +
      "</span>" +
      "<span>Region: " +
      data[i].region +
      "</span>" +
      "<span>Capital: " +
      data[i].capital +
      "</span>";
    mainContainer.appendChild(div);
  }
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
}
