import { FRAME, LOGO_ANIM_LEN, EXIT_ANIM_LEN } from "../globals";
import { GameState, GameStateManager } from "./GameStateManager";

export class GameMenuScreen {
  private _logoComponent: HTMLDivElement;
  private _playComponent: HTMLDivElement;

  constructor() {
    this._logoComponent = document.createElement("div");
    this._playComponent = document.createElement("div");
  }

  private createLogoComponent(): void {
    this._logoComponent.classList.add("logo-container");
    this._logoComponent.innerHTML = `
      <div class="tp-logo-placeholder"></div>
      <div class="game-logo-placeholder"></div>
    `;

    FRAME.appendChild(this._logoComponent);
  }

  private createPlayComponent(): void {
    this._playComponent.classList.add("play-btn-container");
    this._playComponent.innerHTML = `
      <a id="play-btn" class="nes-btn nes-btn-custom" type="button">Play</a>
      <div class="play-text-hint">
        <p>or</p>
        <p class="blink_anim">press the ENTER key to start</p>
      </div>
    `;

    FRAME.appendChild(this._playComponent);
  }

  public bindPlayClickEvent(stateManager: GameStateManager): void {
    let playButton = document.querySelector("a#play-btn");

    const removeMethodCopy = () => {
      this.remove();
      document.removeEventListener("keydown", handleKeydownEvent);
    };

    const handleKeydownEvent = (e: any) => {
      if (e.repeat) {
        return;
      }

      if (e.key === "Enter") {
        stateManager.switch(GameState.LEVEL_SELECT);
        removeMethodCopy();
      }
    };

    // event listeners
    playButton.addEventListener("click", () => {
      stateManager.switch(GameState.LEVEL_SELECT);
      removeMethodCopy();
    });

    document.addEventListener("keydown", handleKeydownEvent);
  }

  private animateEntrance(): void {
    const logo = <HTMLElement>(
      document.querySelector("#frame-container .logo-container")
    );

    logo.style.transform = "scale(1)";

    // display after logo animations
    setTimeout(() => {
      const background = <HTMLElement>(
        document.querySelector(".background-container")
      );
      background.style.animation = "slide 180s linear infinite";
    }, LOGO_ANIM_LEN);
  }

  private animateExit(): void {
    const logo = <HTMLElement>(
      document.querySelector("#frame-container .logo-container")
    );

    logo.style.animation = "animateExitLogo 0.3s ease";

    // wait for exit animation before unsetting
    setTimeout(() => {
      logo.style.animation = "unset";
    }, EXIT_ANIM_LEN);
  }

  public display(): void {
    this.createLogoComponent();
    setTimeout(this.animateEntrance, 400);

    // wait for logo animation before drawing play button
    setTimeout(() => {
      this.createPlayComponent();
    }, LOGO_ANIM_LEN);
  }

  public remove(): void {
    let logo: HTMLElement = <HTMLElement>(
      document.querySelector("#frame-container .logo-container")
    );

    this.animateExit();

    // wait for exit animation before removing
    setTimeout(() => {
      logo.style.transform = "scale(0)";
      logo.remove();
      document.querySelector(".play-btn-container").remove();
    }, EXIT_ANIM_LEN);
  }
}
