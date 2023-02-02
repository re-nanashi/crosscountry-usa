import { CANVAS } from "../globals";

export class Buffer {
  private _bufferContainerDiv: HTMLDivElement;

  constructor() {
    this._bufferContainerDiv = document.createElement("div");
  }

  private render(): void {
    this._bufferContainerDiv.classList.add("container-spinner-div");

    this._bufferContainerDiv.innerHTML = `
      <div id="loader"></div>
    `;
  }

  public display(): void {
    this.render();

    CANVAS.appendChild(this._bufferContainerDiv);

    setTimeout(() => {
      CANVAS.removeChild(this._bufferContainerDiv);
    }, 1400);
  }
}
