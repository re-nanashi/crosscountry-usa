import { FRAME, LOGO_ANIM_LEN, EXIT_ANIM_LEN } from "../globals";
import { GameState, State } from "./state";

export class GameMenu {
  private _logoContElement: HTMLDivElement;
  private _playContElement: HTMLDivElement;

  constructor() {
    this._logoContElement = document.createElement("div");
    this._playContElement = document.createElement("div");
  }

  private drawLogoArea(): void {
    this._logoContElement.classList.add("logo-container");
    this._logoContElement.innerHTML = `
      <div class="tp-logo-placeholder"></div>
      <div class="game-logo-placeholder"></div>
    `;

    FRAME.appendChild(this._logoContElement);
  }

  private drawPlayArea(): void {
    this._playContElement.classList.add("play-btn-container");
    this._playContElement.innerHTML = `
      <a id="play-btn" class="nes-btn nes-btn-custom" type="button">Play</a>
      <div class="play-text-hint">
        <p>or</p>
        <p class="blink_anim">press the ENTER key to start</p>
      </div>
    `;

    FRAME.appendChild(this._playContElement);
  }

  private animate(): void {
    const logo = <HTMLElement>(
      document.querySelector("#frame-container .logo-container")
    );
    logo.style.transform = "scale(1)";

    setTimeout(() => {
      const background = <HTMLElement>(
        document.querySelector(".background-container")
      );
      background.style.animation = "slide 90s linear infinite";
    }, LOGO_ANIM_LEN);
  }

  private animateExit(): void {
    document.querySelector<HTMLElement>(".logo-container").style.animation =
      "animateExitLogo 0.3s ease";

    // Wait for exit animation before unsetting
    setTimeout(() => {
      document.querySelector<HTMLElement>(".logo-container").style.animation =
        "unset";
    }, EXIT_ANIM_LEN);
  }

  public display(): void {
    this.drawLogoArea();
    setTimeout(this.animate, 400);

    // Wait for logo animation before drawing play button
    setTimeout(() => {
      this.drawPlayArea();
    }, LOGO_ANIM_LEN);
  }

  public remove(): void {
    let logo = <HTMLElement>(
      document.querySelector("#frame-container .logo-container")
    );

    this.animateExit();

    // Wait for exit animation before removing
    setTimeout(() => {
      logo.style.transform = "scale(0)";
      logo.remove();
      document.querySelector(".play-btn-container").remove();
    }, EXIT_ANIM_LEN);
  }

  public bindPlayEvent(state: GameState): void {
    let playButton = document.querySelector("a#play-btn");

    playButton.addEventListener("click", () => {
      state.setNewState(State.LEVEL_SELECT);
      this.remove();
    });
  }
}
