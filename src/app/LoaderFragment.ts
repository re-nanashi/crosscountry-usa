import { FRAME } from "../globals";

export class LoaderFragment {
  private _loaderContainerDiv: HTMLDivElement;

  constructor() {
    this._loaderContainerDiv = document.createElement("div");
  }

  private createLoaderFragment(): void {
    this._loaderContainerDiv.classList.add("c-loader");
    this._loaderContainerDiv.innerHTML = `
      <div class="c-loader__title">
        <div class="c-loader__state c-loader__state--progress">
          Now Loading
        </div>
        <div class="c-loader__state c-loader__state--complete">Complete</div>
      </div>
      <div class="c-loader__holder">
        <span class="c-loader__progress"></span>
        <span
          class="c-loader__progress-helper c-loader__progress-helper--left"
        ></span>
        <span
          class="c-loader__progress-helper c-loader__progress-helper--right"
        ></span>
        <svg
          class="c-loader__svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 237 22"
        >
          <path
            d="M235.4 8.5h-1.6V5h-4V1H5.8v4h-3v3.5h-2v6h2V17h3v4h224v-4h4v-2.5h1.6v-6zm-3.6 6.5h-4v4H7.8v-4h-3V7h3V3h220v4h4v8z"
            id="Layer_7"
          />
        </svg>
      </div>
    `;
  }

  public display(playLoadComplete: Function): void {
    const displayDuration: number = 4000;

    this.createLoaderFragment();
    FRAME.appendChild(this._loaderContainerDiv);
    this._loaderContainerDiv.classList.add("is--started");

    setTimeout(() => {
      playLoadComplete();
    }, 2800);

    // remove fragment after display duration
    setTimeout(() => {
      this._loaderContainerDiv.remove();
    }, displayDuration);
  }
}
