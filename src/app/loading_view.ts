import { generateHTMLCode } from "./loading_model";

const GAME_CANVAS = <HTMLDivElement>document.getElementById("game-canvas");

function renderLoader(): void {
  const loader: HTMLDivElement = document.createElement("div");

  loader.classList.add("c-loader");
  loader.innerHTML = generateHTMLCode();

  GAME_CANVAS.append(loader);
}

function removeLoader(): void {
  const loader: HTMLDivElement = document.querySelector(".c-loader");

  if (!GAME_CANVAS.contains(loader)) {
    return;
  }

  GAME_CANVAS.removeChild(loader);
}

export function runLoader(): void {
  renderLoader();

  const loader: HTMLDivElement = document.querySelector(".c-loader");
  loader.classList.add("is--started");

  setTimeout(removeLoader, 4000);
}
