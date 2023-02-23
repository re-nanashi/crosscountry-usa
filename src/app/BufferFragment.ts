import { CANVAS } from "../globals";

export class BufferFragment {
  private _bufferContainerDiv: HTMLDivElement;

  constructor() {
    this._bufferContainerDiv = document.createElement("div");
  }

  private createBufferFragment(): void {
    this._bufferContainerDiv.classList.add("container-spinner-div");
    this._bufferContainerDiv.innerHTML = `
      <div id="loader"></div>
    `;
  }

  public display(): void {
    const displayDuration: number = 1400;

    this.createBufferFragment();
    CANVAS.appendChild(this._bufferContainerDiv);

    // remove fragment after display duration
    setTimeout(() => {
      CANVAS.removeChild(this._bufferContainerDiv);
    }, displayDuration);
  }
}
