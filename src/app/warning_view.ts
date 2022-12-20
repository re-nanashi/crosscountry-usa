const GAME_CANVAS = <HTMLDivElement>document.getElementById("game-canvas");

function displayWarningModal() {
  // hide current canvas
  GAME_CANVAS.classList.add("hidden");
}

export function renderWarningModal() {
  displayWarningModal();
}
