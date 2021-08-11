//PAGE-LOAD Scripts

window.onload = function () {
  document.documentElement.setAttribute("data-theme", "light");
};

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
  x.style.display = "block";
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
