import { GAME_CANVAS, MIN_WIDTH, MIN_HEIGHT } from "./globals";

export enum ModalType {
  SCREEN_RESOLUTION_WARNING,
  AUDIO_ON_REMINDER,
  TIME_LIMIT_IS_UP_NOTIF,
  GAME_CLEARED_NOTIF,
}

class Modal {
  public display(): void {}
  public remove(): void {}
}

class WarningModal extends Modal {
  private warningModalElement: HTMLDialogElement;

  constructor() {
    super();
    this.warningModalElement = document.createElement("dialog");
    this.renderWarningModal();
  }

  private renderWarningModal(): void {
    this.warningModalElement.setAttribute("id", "dialog-default");
    this.warningModalElement.classList.add("nes-dialog", "modal");
    this.warningModalElement.innerHTML = `
      <form method="dialog" class="is-centered">
        <span class="nes-text is-error is-centered">WARNING</span>
        <p></p>
        <p>Screen resolution requirements not met.</p>
        <p>Please change the screen resolution to 1024 x 768 pixels or higher.</p>
        <div class="modal-button-container">
            <a class="nes-btn nes-btn-custom" type="button" onClick="window.location.reload()">Reload</a>
        </div>
      </form>
    `;
  }

  public display(): void {
    GAME_CANVAS.appendChild(this.warningModalElement);

    let dialogDefault: HTMLDialogElement = <HTMLDialogElement>(
      document.getElementById("dialog-default")
    );
    dialogDefault.showModal();
  }

  public hide(): void {
    let dialogDefault: HTMLDialogElement = <HTMLDialogElement>(
      document.getElementById("dialog-default")
    );
    dialogDefault.close();
  }

  public remove(): void {
    const modal = document.querySelector("dialog-default");
    GAME_CANVAS.removeChild(modal);
  }

  public isWarningModalToBeShown(isModalShown: Boolean): Boolean {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    let ret: Boolean = false;

    if (
      (currentWidth < MIN_WIDTH || currentHeight < MIN_HEIGHT) &&
      !isModalShown
    )
      ret = true;

    return ret;
  }
}

class AudioReminderModal extends Modal {
  private audioReminderModalElement: HTMLDialogElement;
  constructor() {
    super();
    this.audioReminderModalElement = document.createElement("dialog");
    this.renderAudioReminderModal();
  }

  private renderAudioReminderModal(): void {
    this.audioReminderModalElement.setAttribute("id", "dialog-default");
    this.audioReminderModalElement.classList.add("nes-dialog", "modal");
    this.audioReminderModalElement.innerHTML = `
      <form method="dialog" class="is-centered">
        <span class="nes-text is-warning is-centered">REMINDER</span>
        <p>Before proceeding, please click the audio button on the lower right corner of the screen.</p>
        <p>Insert Image Here</p>
        <div class="modal-button-container">
            <a class="nes-btn nes-btn-custom to-loader" type="button">Proceed</a>
        </div>
      </form>
    `;
    GAME_CANVAS.appendChild(this.audioReminderModalElement);
  }

  //TODO
  private handleProceedEvent() {
    // create animation for modal when it exits
    //
    // we are going to remove this modal
    // proceed with displaying the next screen
    let proceedButton: HTMLButtonElement = document.querySelector("to-loader");
    proceedButton.addEventListener("click", () => {});
  }
  public bindEvents(): void {}

  public display(): void {
    let dialogDefault: HTMLDialogElement = <HTMLDialogElement>(
      document.getElementById("dialog-default")
    );
    dialogDefault.showModal();
  }

  public hide(): void {
    let dialogDefault: HTMLDialogElement = <HTMLDialogElement>(
      document.getElementById("dialog-default")
    );
    dialogDefault.close();
  }

  public remove(): void {
    const Modal = document.querySelector("dialog-default");
    GAME_CANVAS.removeChild(Modal);
  }
}

export class ModalView {
  private screenResWarningModal: WarningModal;
  private audioReminderModal: AudioReminderModal;

  constructor() {
    this.screenResWarningModal = new WarningModal();
    this.audioReminderModal = new AudioReminderModal();
  }

  public isWarningModalToBeShown(isModalShown: Boolean): Boolean {
    return this.screenResWarningModal.isWarningModalToBeShown(isModalShown);
  }

  public bindEvents(): void {}

  public display(modalToDisplay: ModalType): void {
    switch (modalToDisplay) {
      case ModalType.SCREEN_RESOLUTION_WARNING:
        this.screenResWarningModal.display();
        break;
      case ModalType.AUDIO_ON_REMINDER:
        this.audioReminderModal.display();
        break;
    }
  }
}
