let filteredArray: Countries = [];
let searchSuggestion: HTMLDivElement;

const populateSearchSuggestion = () => {
  searchSuggestion = <HTMLDivElement>(
    document.getElementById("search-suggestion")
  );
  const inputValue = (<HTMLInputElement>(
    document.getElementById("search-input")
  )).value.toLowerCase();

  if (inputValue.length >= 3) {
    searchSuggestion.innerHTML = "";

    filteredArray = countries.filter(
      (country) => country.name.toLowerCase().indexOf(inputValue) !== -1
    );

    filteredArray.map((el) => {
      searchSuggestion.innerHTML += /* html */ `<div tabindex="0" class="suggestion-text" id="suggestion-text" onclick="searchFromSuggestion('${el.name}')">${el.name}</div>`;
    });
  } else {
    searchSuggestion.innerHTML = "";
  }
};

const searchCountry = (event: Event) => {
  event.preventDefault();
  if (filteredArray.length > 0) {
    appendCountries(filteredArray);
    clearSearch();
  } else return;
};

const searchFromSuggestion = (countryName: string) => {
  const selectedCountry = countries.filter(
    (country) => country.name === countryName
  );
  appendCountries(selectedCountry);
  clearSearch();
};

const clearSearch = () => {
  const inputValue = <HTMLInputElement>document.getElementById("search-input");
  filteredArray = [];
  searchSuggestion.innerHTML = "";
  inputValue.value = "";
};
