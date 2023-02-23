import { FRAME, CANVAS } from "../globals";
import { GameState, GameStateManager } from "./GameStateManager";

export enum ModalType {
  SCREEN_RESOLUTION_WARNING = 0,
  AUDIO_ON_REMINDER,
  TIME_LIMIT_IS_UP_NOTIFICATION,
  GAME_CLEARED_NOTIFICATION,
  HINT_MODAL,
}

export class ModalCreator {
  private _modalElement: HTMLDivElement;

  constructor() {
    this._modalElement = document.createElement("div");
  }

  private createAudioReminderModal(): void {
    this._modalElement.setAttribute("id", "modal");
    this._modalElement.classList.add("nes-container", "is-centered");
    this._modalElement.innerHTML = `
      <span class="nes-text is-warning is-centered">REMINDER</span>
      <p>
        Before proceeding, please click the audio button on the lower left
        corner of the screen.
      </p>
      <p>
        Note: Press F11 to enter fullscreen.
      </p>
      <div class="modal-button-container">
        <a id="proceed-btn" class="nes-btn nes-btn-custom is-disabled" type="button"
          >Proceed</a
        >
      </div>
    `;

    FRAME.appendChild(this._modalElement);

    // sound on/off button balloon
    let balloon = document.createElement("div");

    balloon.classList.add("nes-balloon", "from-left");
    balloon.innerHTML = `<p>Click me!</p>`;

    setTimeout(() => {
      CANVAS.appendChild(balloon);
    }, 400);
  }

  private bindSoundButtonClickEvent(): void {
    let soundButton = document.querySelector("#sound-btn");

    soundButton.addEventListener("click", () => {
      soundButton.classList.toggle("on");
      document.querySelector("#proceed-btn")?.classList.remove("is-disabled");
    });
  }

  // call when a audio reminder modal is created
  public bindProceedButtonClickEvent(gameStateManager: GameStateManager): void {
    let proceedButton = this._modalElement.querySelector("#proceed-btn");

    proceedButton.addEventListener("click", () => {
      if (!proceedButton.classList.contains("is-disabled")) {
        // switch state
        gameStateManager.switch(GameState.GAME_MENU);

        // remove balloon fragment
        document.querySelector("div.nes-balloon.from-left").remove();

        // remove modal element
        this.removeModalElement();
      }
    });
  }

  private createScreenResWarningModal(): void {
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

  private createTimeLimitIsUpNotificationModal(): void {
    this._modalElement.setAttribute("id", "in-game-modal");
    this._modalElement.classList.add("nes-container", "is-centered");
    this._modalElement.innerHTML = `
      <span class="nes-text is-error is-centered">TIME IS UP!</span>
      <p>Sorry, you were not able to solve the puzzle.</p>
      <p>Please click confirm to go back to the level selection menu.</p>
      <div class="modal-button-container">
          <a id="u-confirm" class="nes-btn nes-btn-custom" type="button">Confirm</a>
      </div>
    `;

    CANVAS.appendChild(this._modalElement);
  }

  private createGameClearedNotificationModal(): void {
    this._modalElement.setAttribute("id", "in-game-modal");
    this._modalElement.classList.add("nes-container", "is-centered");
    this._modalElement.innerHTML = `
      <span class="nes-text is-success is-centered">PUZZLE SOLVED!</span>
      <p>Great Job! You were able to solve the puzzle.</p>
      <p>Please click confirm to go back to the level selection menu.</p>
      <div class="modal-button-container">
          <a id="u-confirm" class="nes-btn nes-btn-custom" type="button">Confirm</a>
      </div>
    `;

    CANVAS.appendChild(this._modalElement);
  }

  public createHintModal(hintNumber: number): void {
    const hints: Array<string> = [
      `<p>
       <b>Largest States by Area in the United States</b><br>
        > Wyoming (Total area: 97,813 square miles)<br>
        > Oregon (Total area: 98,379 square miles)<br>
        > Colorado (Total area: 104,094 square miles)<br>
        > Nevada (Total area: 110,572 square miles)<br>
        > Arizona (Total area: 113,990 square miles)<br>
        > New Mexico (Total area: 121,590 square miles)<br>
        > Montana (Total area: 147,040 square miles)<br>
        > California (Total area: 163,696 square miles)<br>
        > Texas (Total area: 268,596 square miles)<br>
        > Alaska (Total area: 665,384 square miles)<br>
       </p>`,
      `<p>The stars on USA flag represent the states of the union, while the 13 stripes on the flag represent the 13 original states. The US flag has a ratio of width-to-length: 10 to 19. There are exactly 50 states in the USA.</p>`,
      `<p>
       <b>Two of the Best U.S. National Parks</b><br>
        1. One of California's most-visited national parks, Yosemite National Park stands out for its bevy of impressive waterfalls, such as Vernal Fall and Bridalveil Fall, as well as unique granite rock formations like Half Dome and El Capitan.<br>
        2. Even if Yellowstone didn't hold the incredible distinction of being the world's first national park, the 2.2 million-acre park could easily stand on its own for its unique natural attractions and diverse geography.<br>
       </p>`,
      `<p> 
        In a letter to a friend, Former President Benjamin Franklin wrote this in opposition to USA's national bird:<br>
        <i>I wish the bald eagle had not been chosen as the representative of our country; he is a bird of bad moral character; like those among men who live by sharping and robbing, he is generally poor, and often very lousy. The turkey is a much more respectable bird and withal a true, original native of America.</i>
       </p>`,
      `<p>
       <b>Highest Mountains in the United States</b><br>
        >	Mount Mckinley - 20,320 ft<br>
        >	Mount St. Elias - 18,008 ft<br>
        >	Mount Foraker - 17,400 ft<br>
        >	Mount Bona - 16,500 ft<br>
        >	Mount Blackburn - 16,390 ft<br>
        >	Mount Sanford - 16,237 ft<br>
        >	Mount Vancouver - 15,979 ft<br>
        >	South Buttress - 15,885 ft<br>
        >	Mount Churchill - 15,638 ft<br>
        >	Mount Fairweather - 15,300 ft
       </p>`,
      `<p>The city was crafted in the US constitution to be the capital of the new United States of America. The first brick was laid on July 16, 1790. The location took time to negotiate, coming 14 years after the end of the war against the British with the southern states wanting a capital closer to their landowning, slave owning territory.</p>
       <p>First President George Washington chose the land himself with two nearby states, Maryland and Virginia, ceding land for it to be created. The designer, Pierre Charles L'Enfant, wanted to city to reflect his native Paris, but this was before Paris was planned how it is today, making the cities feel distinct to one another.</p>`,
      `<p>Shared between Western New York in the USA and Southeastern Ontario in Canada, Niagara Falls is not only one of the famous waterfalls in the world but also the largest waterfall in the US in terms of volume. It is comprised of three different waterfalls - Horseshoe Falls, American Falls, and Bridal Veil Falls.</p>
       <p>Niagara Falls is not only one of the famous waterfalls in the world but also the largest waterfall in the US in terms of volume. It is comprised of three different waterfalls - Horseshoe Falls, American Falls, and Bridal Veil Falls.</p>`,
      `<p>
       <b>Most Populous Cities of the United States (estimates)</b><br>
        > New York - 8,467,513<br>
        > Los Angles - 3,849,297<br>
        > Chicago - 2,696,555<br>
        > Houston - 2,288,250<br>
        > Phoenix - 1,624,569<br>
        > Philadelphia - 1,576,251<br>
        > San Antonio - 1,451,853<br>
        > San Diego - 1,381,611<br>
        > Dallas - 1,288,457<br>
        > San Jose - 983,489<br>
       </p>`,
      `<p>The mainland of the United States is bordered by the Atlantic Ocean in the east and the Pacific Ocean in the west. The country borders Canada in the north and has a 3,155 km long border to Mexico in the south. The United States shares maritime borders with the Bahamas, Cuba, and Russia (in Alaska).</p>`,
      `<p>Natural disasters can strike at any given time, with no warnings. Natural disasters in the USA are bound to happen because this country is one of the most active seismic areas globally.</p>
       <p>Natural disasters in the USA have been devastating throughout history. The most potent natural catastrophes that took place in the US include hurricanes, tornadoes, floods, droughts, volcanoes, tsunamis and wildfires.</p>`,
    ];
    let textHint = hints[hintNumber];

    this._modalElement.setAttribute("id", "in-game-modal");
    this._modalElement.classList.add("nes-container", "is-centered");
    this._modalElement.innerHTML = `
      <span class="nes-text is-primary is-centered">HINT</span>
      <div>${textHint}</div>
      <div class="modal-button-container">
          <a id="u-confirm" class="nes-btn nes-btn-custom" type="button">Exit</a>
      </div>
    `;

    CANVAS.appendChild(this._modalElement);
  }

  // call when a game cleared/hint notification modal is created
  public bindConfirmButtonClickEvent(exitHandler: Function): void {
    let confirmButton = document.querySelector("#u-confirm");

    confirmButton.addEventListener("click", () => {
      this.removeModalElement();
      exitHandler();
    });
  }

  public removeModalElement(): void {
    let modalElement =
      document.querySelector("#modal") ||
      document.querySelector("#in-game-modal");

    modalElement.remove();
  }

  public create(typeOfModalToCreate: ModalType, hintNumber = 0): void {
    switch (typeOfModalToCreate) {
      case ModalType.AUDIO_ON_REMINDER:
        this.createAudioReminderModal();
        this.bindSoundButtonClickEvent();
        break;
      case ModalType.SCREEN_RESOLUTION_WARNING:
        this.createScreenResWarningModal();
        break;
      case ModalType.TIME_LIMIT_IS_UP_NOTIFICATION:
        this.createTimeLimitIsUpNotificationModal();
        break;
      case ModalType.GAME_CLEARED_NOTIFICATION:
        this.createGameClearedNotificationModal();
        break;
      case ModalType.HINT_MODAL:
        this.createHintModal(hintNumber);
        break;
      default:
        break;
    }
  }
}
