const GAME_CANVAS = document.getElementById("game-canvas");

export function runLoader() {
  const loader = document.querySelector(".c-loader");
  loader.classList.add("is--started");
}

/*
function displayLoader(): void {
  const loader: HTMLDivElement = document.createElement("div");
  loader.classList.add("c-loader");

  loader.innerHTML = `
		<div class="sk-cube-grid">
		<div class="sk-cube sk-cube1"></div>
		<div class="sk-cube sk-cube2"></div>
		<div class="sk-cube sk-cube3"></div>
		<div class="sk-cube sk-cube4"></div>
		<div class="sk-cube sk-cube5"></div>
		<div class="sk-cube sk-cube6"></div>
		<div class="sk-cube sk-cube7"></div>
		<div class="sk-cube sk-cube8"></div>
		<div class="sk-cube sk-cube9"></div>
	  </div>
    `;

  document.body.append(containerDiv);
}

export function runLoader_(): void {
  displayLoader();

  setTimeout(removeLoader, 1400);

  function removeLoader(): void {
    const containerDiv: HTMLDivElement = document.querySelector(
      "#container-loader-div"
    );

    document.body.removeChild(containerDiv);
  }
}
*/
