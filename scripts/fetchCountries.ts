type Countries = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
}[];

let countries: Countries;

fetch("https://restcountries.com/v2/all")
  .then((response) => {
    return response.json();
  })
  .then((data: Countries) => {
    countries = data;
    appendCountries(countries);
  })
  .catch((err) => {
    console.log(err);
  });

const appendCountries = (countries: Countries) => {
  console.log(countries);
  let countryList = <HTMLInputElement>document.getElementById("country-list");
  countryList.innerHTML = "";

  countries.map((country) => {
    var countryCard = document.createElement("li");
    countryCard.classList.add("country-card");
    countryCard.innerHTML = /* html */ `
    <img class="flag" src="${country.flag}" alt="The flag of ${country.name}">
    <div class='info-container'>
      <h2 class='country-name'>${country.name}</h2>
        <div class='stats-title'>Population: <span class='stats'>${getPopulation(
          country.population
        )}</span></div>
        <div class='stats-title'>Region: <span class='stats'>${getRegion(
          country.region
        )}</span></div>
        <div class='stats-title'>Capital: <span class='stats'>${getCapital(
          country.capital
        )}</span></div>
    </div>`;

    countryList.appendChild(countryCard);
  });
};

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
  if (!capital) {
    return "<span class='empty-data'>none</span>";
  } else return capital;
};
