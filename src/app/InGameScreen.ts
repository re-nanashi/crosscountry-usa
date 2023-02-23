import { FRAME } from "../globals";
import { ModalType, ModalCreator } from "./ModalCreator";
import { GameState, GameStateManager } from "./GameStateManager";

export class InGameScreen {
  private _headerComponent: HTMLElement;
  private _gameContentComponent: HTMLElement;
  private _container: HTMLElement;

  private _modalCreator: ModalCreator;

  constructor() {
    this._gameContentComponent = document.createElement("div");
    this._modalCreator = new ModalCreator();
  }

  private createHeaderComponentChildComponents(): void {
    this._headerComponent = document.querySelector("#game-header-container");

    let levelIndicatorComponent = document.createElement("div");
    let timerComponent = document.createElement("div");

    levelIndicatorComponent.classList.add("level-indicator-area");
    timerComponent.classList.add("timer-area");

    levelIndicatorComponent.innerHTML = `
      Level
      <div class="level-star-img-placeholder"></div>
    `;

    timerComponent.innerHTML = `
      <div class="timer-icon-container">
        <div class="timer-icon-placeholder"></div>
      </div>
      <div class="progress-container">
        <progress
          class="nes-progress is-custom"
          value="100"
          max="100"
        ></progress>
      </div>
    `;

    this._headerComponent.appendChild(levelIndicatorComponent);
    this._headerComponent.appendChild(timerComponent);
  }

  private generateCrosswordTable(): string {
    let htmlString = `<div class="cell"></div>`;
    let source = `\n<div class="cell"></div>`;
    for (let i = 0; i < 255; i++) {
      htmlString += source;
    }

    return htmlString;
  }

  private createGameContentComponent(): void {
    let crosswordCont = document.createElement("section");
    let questionsCont = document.createElement("section");

    this._gameContentComponent.setAttribute("id", "game-content-container-ig");
    crosswordCont.setAttribute("id", "crossword-container");
    questionsCont.setAttribute("id", "questions-container");

    let tableCont = document.createElement("div");
    let _cont = document.createElement("div");
    tableCont.setAttribute("id", "table-container");
    _cont.setAttribute("id", "_cont");
    // generate table
    _cont.innerHTML = this.generateCrosswordTable();

    // set the container property
    this._container = _cont;
    tableCont.appendChild(this._container);

    let inputCont = document.createElement("div");
    inputCont.setAttribute("id", "input-container");
    inputCont.innerHTML = `
      <!-- default number is the first question -->
      <div id="cell-number">5</div>
      <input
        oninput="this.value = this.value.toUpperCase()"
        type="text"
        id="guess-text"
        class="nes-input"
      />
      <a id="enter-btn" class="nes-btn nes-btn-custom" type="button">
        Enter
      </a>
    `;

    crosswordCont.appendChild(tableCont);
    crosswordCont.appendChild(inputCont);

    // TODO should use a JSON file from server to hide contents
    questionsCont.innerHTML = `
      <div
        class="across-questions-container nes-container is-rounded with-title"
      >
        <p class="title">Across</p>
        <!-- ADD ACROSS QUESTIONS HERE-->
        <!-- ADD "active" if question card is the selected one -->

        <div
          class="nes-container with-title is-centered question-card active"
        >
          <p class="title">5</p>
          <p>The highest mountain top in the USA</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="5">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">6</p>
          <p>This man's name was given to the capital of the USA</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="6">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">9</p>
          <p>A neighboring country of the USA</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="9">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">10</p>
          <p>
            A significant percentage of this natural phenomenon occurs in
            the USA
          </p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="10">Hint</a>
        </div>
        <!-- END ADDING ACROSS QUESTIONS HERE -->
      </div>
      <div
        class="down-questions-container nes-container is-rounded with-title"
      >
        <p class="title">Down</p>
        <!-- ADD DOWN QUESTIONS HERE-->

        <div class="nes-container with-title is-centered question-card">
          <p class="title">1</p>
          <p>The largest state(area) in the USA</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="1">Hint</a>
        </div>

        <!-- if cleared, add "cleared" to styling -->
        <div class="nes-container with-title is-centered question-card">
          <p class="title">2</p>
          <p>The number of stars on the US flag</p>
          <!-- if cleared, add "is-disabled" to styling -->
          <a class="nes-btn nes-btn-custom" type="button" data-number="2">Hint</a>
          <!-- if cleared, add indicator html code -->
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">3</p>
          <p>The oldest national park in the world</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="3">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">4</p>
          <p>The national bird of the USA</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="4">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">7</p>
          <p>The most famous waterfall in North America</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="7">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">8</p>
          <p>Third most populated city in the USA</p>
          <a class="nes-btn nes-btn-custom" type="button" data-number="8">Hint</a>
        </div>
        <!-- END ADDING DOWN QUESTIONS HERE -->
      </div>
    `;

    // append to parent both the crossword and questions
    this._gameContentComponent.appendChild(crosswordCont);
    this._gameContentComponent.appendChild(questionsCont);

    // append to FRAME
    FRAME.appendChild(this._gameContentComponent);
  }

  public showGameOverNotificationModal(playGameOverSound: Function): void {
    this._modalCreator.create(ModalType.TIME_LIMIT_IS_UP_NOTIFICATION);
    playGameOverSound();
    (document.querySelector("#frame-container") as HTMLElement).classList.add(
      "hidden"
    );
    this._modalCreator.bindConfirmButtonClickEvent(() => {
      (document.querySelector("#return-btn") as HTMLElement).click();
      (
        document.querySelector("#frame-container") as HTMLElement
      ).classList.remove("hidden");
    });
  }

  public showGameClearedNotificationModal(
    playPuzzleSolvedSound: Function
  ): void {
    this._modalCreator.create(ModalType.GAME_CLEARED_NOTIFICATION);
    playPuzzleSolvedSound();
    (document.querySelector("#frame-container") as HTMLElement).classList.add(
      "hidden"
    );
    this._modalCreator.bindConfirmButtonClickEvent(() => {
      (document.querySelector("#return-btn") as HTMLElement).click();
      (
        document.querySelector("#frame-container") as HTMLElement
      ).classList.remove("hidden");
    });
  }

  public showHintModal(hintNumber: number): void {
    this._modalCreator.create(ModalType.HINT_MODAL, hintNumber);
    (
      document.querySelector("#game-content-container-ig") as HTMLElement
    ).classList.add("hidden");
    this._modalCreator.bindConfirmButtonClickEvent(() => {
      (
        document.querySelector("#game-content-container-ig") as HTMLElement
      ).classList.remove("hidden");
    });
  }

  public bindReturnClickEvent(
    stateManager: GameStateManager,
    timer: any,
    resetGame: Function,
    resetSound: Function
  ): void {
    let backButton = document.querySelector("#return-btn");

    const removeGameScreen = (): void => {
      let levelIndicatorArea = document.querySelector(".level-indicator-area");
      let timerArea = document.querySelector(".timer-area");
      let questionsCont = document.querySelector("#questions-container");
      let inputCont = document.querySelector("#input-container");
      let tableCont = document.querySelector("#table-container");
      let hintCont = document.querySelector("#in-game-modal");

      // reset round figures
      resetGame();
      // reset sound
      resetSound();

      if (hintCont) {
        let temp = document.querySelector(
          "#game-content-container-ig"
        ) as HTMLElement;
        hintCont.remove();

        if (temp.classList.contains("hidden")) {
          temp.classList.remove("hidden");
        }
      }

      // TODO remove game screen
      // question container will slide right then remove
      questionsCont.classList.add("exit");
      setTimeout(() => {
        questionsCont.classList.remove("exit");
        questionsCont.remove();
      }, 200);

      // input container will slide down then remove
      inputCont.classList.add("exit");
      setTimeout(() => {
        inputCont.classList.remove("exit");
        inputCont.remove();
      }, 200);

      // table will slide left then remove
      tableCont.classList.add("exit");
      setTimeout(() => {
        tableCont.classList.remove("exit");
        tableCont.remove();
      }, 200);

      // remove game-content-container-ig
      setTimeout(() => {
        document.querySelector("#crossword-container").remove();
        this._gameContentComponent.remove();
      }, 300);

      // level and timer indicators will go up then remove
      levelIndicatorArea.classList.add("exit");
      setTimeout(() => {
        levelIndicatorArea.classList.remove("exit");
        levelIndicatorArea.remove();
      }, 300);

      timerArea.classList.add("exit");
      setTimeout(() => {
        timerArea.classList.remove("exit");
        timerArea.remove();
      }, 300);

      // remove return button functionality
      backButton.removeEventListener("click", handleReturnButtonClickEvent);
    };

    const handleReturnButtonClickEvent = (): void => {
      clearInterval(timer);
      removeGameScreen();
      stateManager.switch(GameState.LEVEL_SELECT);
    };

    backButton.addEventListener("click", handleReturnButtonClickEvent);
  }

  public display(): void {
    this.createHeaderComponentChildComponents();
    this.createGameContentComponent();
  }

  // NOTE: this function should only be called after display has rendered
  public getCrosswordContainerElement(): HTMLElement {
    return this._container;
  }
}
