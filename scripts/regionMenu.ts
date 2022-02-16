const filterByRegion = (region: string) => {
  const regionMenuButton = <HTMLDivElement>(
    document.getElementById("region-menu-button")
  );
  const regionOption = <HTMLDivElement>(
    document.getElementById(region.toLowerCase() + "-option")
  );

  regionMenuButton.innerText = region;

  const filteredArray = countries.filter(
    (country) => country.region === region
  );

  appendCountries(filteredArray);
  regionOption.blur();
};
