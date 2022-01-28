const header = (): string => {
  return /* html */ `
  <header>
    <h1>Where in the world?</h1>
    <div>${darkModeIcon} Dark Mode</div>
  </header>`;
};

document.body.insertAdjacentHTML("afterbegin", header());
