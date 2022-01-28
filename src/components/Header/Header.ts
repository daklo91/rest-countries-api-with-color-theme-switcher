const header = (): string => {
  return /* html */ `
  <header>
    <h1 class="logo">Where in the world?</h1>
    ${darkModeButton}
  </header>`;
};

document.body.insertAdjacentHTML("afterbegin", header());
