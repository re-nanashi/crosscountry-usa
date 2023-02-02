import { CANVAS, FRAME, ModalType } from "../globals";
import { GameState, State } from "./state";

export class ModalCreator {
  private _modalElement: HTMLDivElement;

  constructor() {
    this._modalElement = document.createElement("div");
  }

  private renderAudioReminderModal(): void {
    this._modalElement.setAttribute("id", "modal");
    this._modalElement.classList.add("nes-container", "is-centered");
    this._modalElement.innerHTML = `
      <span class="nes-text is-warning is-centered">REMINDER</span>
      <p>
        Before proceeding, please click the audio button on the lower left
        corner of the screen.
      </p>
      <div class="modal-button-container">
        <a id="proceed-btn" class="nes-btn nes-btn-custom is-disabled" type="button"
          >Proceed</a
        >
      </div>
    `;

    FRAME.appendChild(this._modalElement);

    let balloon = document.createElement("div");
    balloon.classList.add("nes-balloon", "from-left");
    balloon.innerHTML = `<p>Click me!</p>`;

    setTimeout(() => {
      CANVAS.appendChild(balloon);
    }, 400);
  }

  private renderWarningModal(): void {
    this._modalElement.setAttribute("id", "modal");
    this._modalElement.classList.add("nes-container", "is-centered");
    this._modalElement.innerHTML = `
      <span class="nes-text is-warning is-centered">WARNING</span>
      <p>Screen resolution requirements not met.</p>
      <p>Please change the screen resolution to 1024 x 768 pixels or higher.</p>
      <div class="modal-button-container">
          <a class="nes-btn nes-btn-custom" type="button" onClick="window.location.reload()">Reload</a>
      </div>
    `;

    FRAME.appendChild(this._modalElement);
  }

  private bindSoundButtonEvent(): void {
    let soundButton = document.querySelector("#sound-btn");
    soundButton.addEventListener("click", () => {
      soundButton.classList.toggle("on");
      document.querySelector("#proceed-btn").classList.remove("is-disabled");
    });
  }

  public bindProceedEvent(state: GameState): void {
    let proceedButton = this._modalElement.querySelector("#proceed-btn");

    proceedButton.addEventListener("click", () => {
      if (!proceedButton.classList.contains("is-disabled")) {
        state.setNewState(State.GAME_MENU);
        document.querySelector("div.nes-balloon.from-left").remove();
        this.remove();
      }
    });
  }

  public create(type: ModalType): void {
    switch (type) {
      case ModalType.AUDIO_ON_REMINDER:
        this.renderAudioReminderModal();
        this.bindSoundButtonEvent();
        break;
      case ModalType.SCREEN_RESOLUTION_WARNING:
        this.renderWarningModal();
        break;
      default:
        break;
    }
  }

  public remove(): void {
    let modalElement = document.querySelector("#modal");

    modalElement.remove();
  }
}
