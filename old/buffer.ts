import { GAME_CANVAS } from "./globals";

export class BufferView {
  private bufferContainerDiv: HTMLDivElement;

  constructor() {
    this.bufferContainerDiv = document.createElement("div");
  }

  private renderBuffer(): void {
    this.bufferContainerDiv.classList.add("container-spinner-div");

    this.bufferContainerDiv.innerHTML = `
    <div id="loader"></div>
  `;
  }

  private remove(): void {
    const gameCanvas: HTMLDivElement = document.querySelector("#game-canvas");
    gameCanvas.innerHTML = "";
  }

  public display(): void {
    this.renderBuffer();
    GAME_CANVAS.appendChild(this.bufferContainerDiv);

    setTimeout(this.remove, 1400);
  }
}
