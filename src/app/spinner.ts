export class BufferView {
  private GAME_CANVAS: HTMLDivElement;

  constructor(canvas: HTMLDivElement) {
    this.GAME_CANVAS = canvas;
  }

  private renderSpinner(): void {
    const containerDiv: HTMLDivElement = document.createElement("div");
    containerDiv.classList.add("container-spinner-div");

    containerDiv.innerHTML = `
    <div id="loader"></div>
  `;

    this.GAME_CANVAS.appendChild(containerDiv);
  }

  private removeLoader(): void {
    const gameCanvas: HTMLDivElement = document.querySelector("#game-canvas");
    gameCanvas.innerHTML = "";
  }

  displaySpinner(): void {
    this.renderSpinner();

    setTimeout(this.removeLoader, 1400);
  }
}
