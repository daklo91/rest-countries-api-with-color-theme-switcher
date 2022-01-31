// let countries: object[] = [{}];

type Countries = [
  {
    name: string;
    flag: string;
    population: number;
    region: string;
    capital: string;
  }
];

fetch("https://restcountries.com/v2/all")
  .then((response) => {
    return response.json();
  })
  .then((countries: Countries) => {
    // console.log(countries);
    // loadHashFromURL();
    appendData(countries);
  })
  .catch((err) => {
    console.log(err);
  });

type Country = {
  name: string;
};

const appendData = (countries: Countries) => {
  console.log(countries);
  let countryList = document.getElementById("country-list");
  countryList.innerHTML = "";

  countries.map((country) => {
    var countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    // countryCard.setAttribute("id", index);
    // countryCard.onclick = function (event) {
    //   window.location.href =
    //     "#" + countries[event.currentTarget.id].name.toLowerCase();
    //   findDataWithHash(countries[event.currentTarget.id].name.toLowerCase());
    // };
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

// These functions makes it so the card will display "none" if any field is empty
const getPopulation = (population: number) => {
  if (population === 0) {
    return "<span class='empty-data'>none</span>";
  } else return population.toLocaleString();
};
const getRegion = (region: string) => {
  if (region === "") {
    return "<span class='empty-data'>none</span>";
  } else return region;
};
const getCapital = (capital: string) => {
  if (capital) {
    return "<span class='empty-data'>none</span>";
  } else return capital;
};
