const appendData = (data) => {
  data.map((object) => {
    var countryList = document.getElementById("country-list");
    var countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    countryCard.innerHTML =
      "<img class='flag' src='" +
      object.flag +
      "'>" +
      "<div class='stats-section'><h2 class='name'>" +
      object.name +
      "</h2>" +
      "<div class='stats-wrap'><span class='stats-title' id='population-title'>Population: </span><span class='stats' id='population'>" +
      "getPopulation(data, i)" +
      "</span></div>" +
      "<div class='stats-wrap'><span class='stats-title' id='region-title'>Region: </span><span class='stats' id='region'>" +
      "getRegion(data, i)" +
      "</span></div>" +
      "<div class='stats-wrap'><span class='stats-title' id='capital-title'>Capital: </span><span class='stats' id='capital'>" +
      "getCapital(data, i)" +
      "</span></div></div>";
    countryList.appendChild(countryCard);
  });
};
