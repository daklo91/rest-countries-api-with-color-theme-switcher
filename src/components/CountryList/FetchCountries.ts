const fetchCountryURL = "https://restcountries.com/v3.1/all";
let countries: object[] = [];

fetch(fetchCountryURL)
  .then((response) => response.json())
  .then((data: object[]) =>
    data.map((object) => {
      countries.push({
        name: object.name.common,
        population: object.population,
      });
    })
  )
  .then(console.log(countries));
