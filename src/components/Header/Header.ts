const header = (): string => {
  return /* html */ `
  <header>
    <a href="/" aria-label="go to homepage"><h1 class="logo">Where in the world?</h1></a>
    ${darkModeButton}
  </header>`;
};

document.body.insertAdjacentHTML("afterbegin", header());
