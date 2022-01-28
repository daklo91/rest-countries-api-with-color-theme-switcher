const header = (): string => {
  return /* html */ `
  <header>
    <h1>Where in the world?</h1>
    ${darkModeIcon}
  </header>`;
};

document.body.insertAdjacentHTML("afterbegin", header());
