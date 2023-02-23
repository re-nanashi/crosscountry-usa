import { GameStateManager } from "./GameStateManager";
import { InGameScreen } from "./InGameScreen";
import { InGameLogic } from "./InGameLogic";
import { SoundManager } from "./GameDisplay";

export class GameManager {
  private _gameStateManager: GameStateManager;
  private _selectedQuestionNumber: number;
  private _solvedQuestionNumbers: Array<number>;
  private _data: any;
  private _wordsToSolve: Array<string>;

  private _inGameScreen: InGameScreen;
  private _inGameLogic: InGameLogic;
  private _soundManager: SoundManager;

  private _cont: HTMLElement;
  private _cells: Array<any>;
  private _timer: HTMLProgressElement;
  private _timerInterval: any;

  constructor() {
    this._inGameScreen = new InGameScreen();
    this._inGameLogic = new InGameLogic();

    this._selectedQuestionNumber = 5; // default for now(prototype)
    this._solvedQuestionNumbers = [];
    this._data = [];
    this._wordsToSolve = [
      "ALASKA",
      "FIFTY",
      "YELLOWSTONE",
      "BALDEAGLE",
      "MCKINLEY",
      "WASHINGTON",
      "NIAGARA",
      "CHICAGO",
      "MEXICO",
      "TORNADO",
    ];
  }

  private startTimer(): any {
    return setInterval(() => {
      if (this._timer.value == 0) {
        // TODO show game over screen
        clearInterval(this._timerInterval);
        this._inGameScreen.showGameOverNotificationModal(() => {
          this._soundManager.stopInGameBGM();
          this._soundManager.playGameOver();
        });
        return;
      } else if (this._timer.value > 0 && this._timer.value <= 10) {
        // TODO change music here
        this._timer.classList.remove("is-warning");
        this._timer.classList.add("is-error");
      } else if (this._timer.value > 10 && this._timer.value <= 30) {
        this._timer.classList.add("is-warning");
      }

      this._timer.value -= 1;
    }, 6000);
  }

  private placeWord(
    word: string,
    number: number,
    direction: string,
    xCoordinate: any,
    yCoordinate: any
  ) {
    let html = "";
    let occupiedCells = [];
    let cellNumber = this._inGameLogic.coordinatesToCellNumber(
      xCoordinate,
      yCoordinate
    );

    for (let i = 0; i < word.length; i++) {
      occupiedCells.push(
        direction == "horizontal" ? cellNumber + i : cellNumber + i * 16
      );
      let style = `margin-left:${
        direction == "horizontal" ? xCoordinate + i * 6.25 : xCoordinate
      }%; margin-top:${
        direction == "vertical" ? yCoordinate + i * 6.25 : yCoordinate
      }%; `;

      if (i == 0) {
        html += `<div class="block" style="${style}">
                <span style="transform: scale(0);">${word[i]}</span>
                <span>${number}</span>
             </div>`;
      } else {
        html += `<div class="block" style="${style}">
                <span style="transform: scale(0);">${word[i]}</span>
             </div>`;
      }
    }

    this._cont.insertAdjacentHTML("beforeend", html);

    this._data.push({ qnum: number, occupied: occupiedCells });

    return occupiedCells;
  }

  private bindQuestionCardEvents(): void {
    let questionCards = document.querySelectorAll(".question-card");
    let everyCardIsSolved = true;

    // check if puzzle is solved
    questionCards.forEach((card) => {
      everyCardIsSolved =
        everyCardIsSolved &&
        this._solvedQuestionNumbers.includes(
          Number(card.querySelector(".title").textContent)
        );
    });

    if (everyCardIsSolved) {
      // TODO create you have won notification
      let chosenLevel = this._gameStateManager
        .levelSelector()
        .currentlySelectedLevel();

      this._inGameScreen.showGameClearedNotificationModal(() => {
        this._soundManager.stopInGameBGM();
        this._soundManager.playPuzzleSolved();
      });
      this._gameStateManager
        .levelSelector()
        .addClearedCrosswordLevel(chosenLevel);

      return;
    }

    // select available question cards
    for (
      let i = 0;
      i < questionCards.length || this._selectedQuestionNumber == null;
      i++
    ) {
      let card = questionCards[i];
      let questionCardNumber = Number(card.querySelector(".title").textContent);

      if (
        !this._solvedQuestionNumbers.includes(questionCardNumber) &&
        this._selectedQuestionNumber == null
      ) {
        this._selectedQuestionNumber = questionCardNumber;
        document.querySelector("#cell-number").innerHTML = String(
          this._selectedQuestionNumber
        );
        card.classList.add("active");
        // scrollIntoView
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // event handling
    questionCards.forEach((card) => {
      card.addEventListener("click", (e: any) => {
        if (!e.target.classList.contains("active")) {
          if (e.target.classList.contains("cleared")) {
            // TODO play null sound
            this._soundManager.playDisabled();
            return null;
          } else {
            // remove previous active element
            document
              .querySelector(".question-card.active")
              .classList.remove("active");

            // new active element
            e.target.classList.add("active");

            // change indicated selected number in input label
            // TODO check if main var from classes does change
            this._selectedQuestionNumber = Number(
              e.target.querySelector(".title").textContent
            );

            document.querySelector("#cell-number").innerHTML = String(
              this._selectedQuestionNumber
            );
          }
        }
      });
    });
  }

  private submitEventHandler = (e: any) => {
    let textInputContainer = <HTMLInputElement>(
      document.querySelector("#guess-text")
    );
    let textInput = textInputContainer.value.trim();

    if (
      textInput != this._wordsToSolve[this._selectedQuestionNumber - 1] ||
      textInput === "" ||
      textInput == null
    ) {
      // show failed input animation
      this._soundManager.playDisabled();
      textInputContainer.classList.add("is-error");
      setTimeout(() => {
        textInputContainer.classList.remove("is-error");
        textInputContainer.value = "";
      }, 200);
    } else if (
      textInput == this._wordsToSolve[this._selectedQuestionNumber - 1]
    ) {
      // show successful input animation
      this._soundManager.playCorrect();
      textInputContainer.classList.add("is-success");
      setTimeout(() => {
        textInputContainer.classList.remove("is-success");
        textInputContainer.value = "";
      }, 400);

      // set question card as cleared
      let activeQuestionCard = document.querySelector(".question-card.active");
      activeQuestionCard.classList.add("cleared");
      activeQuestionCard
        .querySelector("a.nes-btn")
        .classList.add("is-disabled");
      activeQuestionCard.insertAdjacentHTML(
        "beforeend",
        `
          <div class="cleared-indicator-area">
            <div class="cleared-img-placeholder"></div>
          </div> 
        `
      );
      activeQuestionCard.classList.remove("active");

      // show answer to the table and save data
      this._data.forEach((obj: any) => {
        // TODO create a structure for this object
        if (obj.qnum == this._selectedQuestionNumber) {
          obj.occupied.forEach((cellNumber: any) => {
            let blocksArray =
              this._inGameLogic.getBlocksAtCellNumber(cellNumber);
            if (blocksArray.length == 1) {
              let letter = blocksArray[0].querySelector("span:nth-of-type(1)");
              letter == null
                ? (blocksArray[0].querySelector("span").style.transform =
                    "scale(1)")
                : (letter.style.transform = "scale(1)");
            } else if (blocksArray.length == 2) {
              blocksArray[0].querySelector("span").style.transform = "scale(1)";
              blocksArray[1].querySelector("span").style.transform = "scale(1)";
            }
          });
        }
      });
      this._solvedQuestionNumbers.push(this._selectedQuestionNumber);

      // select the next question
      this._selectedQuestionNumber = null;
      this.bindQuestionCardEvents();
    }
  };

  private handleKeydownEvent = (e: any) => {
    if (e.repeat) return;

    if (e.key === "Enter") {
      this.submitEventHandler(e);
    }
  };

  private bindSubmitEvents(): void {
    document
      .querySelector("#enter-btn")
      .addEventListener("click", this.submitEventHandler);

    document.addEventListener("keydown", this.handleKeydownEvent);
  }

  public reset = () => {
    document.removeEventListener("keydown", this.handleKeydownEvent);
    this._selectedQuestionNumber = 5;
    this._solvedQuestionNumbers = [];
    this._data = [];
  };

  public start(
    stateManager: GameStateManager,
    soundManager: SoundManager
  ): void {
    // for now set the game default: level 1
    this._gameStateManager = stateManager;
    this._soundManager = soundManager;

    //display the selected level
    this._inGameScreen.display();
    this._cont = this._inGameScreen.getCrosswordContainerElement();

    // set the cells and timer after rendering
    this._timer = document.querySelector(
      ".progress-container > progress.nes-progress"
    );
    this._cells = <any>document.querySelectorAll(".cell");
    this._cells.forEach((cell) => (cell.style.opacity = "0"));

    // set the words to solve
    this.placeWord("ALASKA", 1, "vertical", 18.75, 0);
    this.placeWord("YELLOWSTONE", 3, "vertical", 37.5, 6.25);
    this.placeWord("FIFTY", 2, "vertical", 50, 0);
    this.placeWord("BALDEAGLE", 4, "vertical", 62.5, 6.25);
    this.placeWord("CHICAGO", 8, "vertical", 50, 56.25);
    this.placeWord("MCKINLEY", 5, "horizontal", 6.25, 25);
    this.placeWord("WASHINGTON", 6, "horizontal", 25, 43.75);
    this.placeWord("NIAGARA", 7, "vertical", 81.25, 43.75);
    this.placeWord("MEXICO", 9, "horizontal", 31.25, 68.75);
    this.placeWord("TORNADO", 10, "horizontal", 25, 81.25);

    // start timer
    this._timerInterval = this.startTimer();

    // bind return event
    this._inGameScreen.bindReturnClickEvent(
      stateManager,
      this._timerInterval,
      this.reset,
      () => {
        soundManager.stopInGameBGM();
        soundManager.playBGM();
      }
    );

    // start sound
    soundManager.stopBGM();
    soundManager.playInGameBGM();

    // bind question card event handling
    this.bindQuestionCardEvents();

    // bind submit event handling
    this.bindSubmitEvents();

    // TODO hint event handling
    let hintButtons = document.querySelectorAll(
      ".question-card > a.nes-btn-custom"
    );

    hintButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.target as Element;

        if (!target.classList.contains("is-disabled")) {
          const hintNumber: string = target.getAttribute("data-number");
          this._inGameScreen.showHintModal(Number(hintNumber) - 1);
        }
      });
    });
  }
}
