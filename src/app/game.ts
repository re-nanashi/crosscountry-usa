import { InGameView } from "./gameScreen";
import { CrosswordLogic } from "./crosswordLogic";
import { GameState } from "./state";

export class Game {
  private _state: GameState;
  private _selectedQuestionNumber: number;
  private _solved: Array<Number>;
  private _data: any;
  private _wordsToSolve: Array<string>;

  private _inGameView: InGameView;
  private _crosswordLogic: CrosswordLogic;

  private _cont: HTMLElement;
  private _cells: Array<any>;
  private _timer: HTMLProgressElement;
  private _timerInterval: any;

  constructor() {
    this._selectedQuestionNumber = 5;
    this._solved = [];
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

    this._inGameView = new InGameView();
    this._crosswordLogic = new CrosswordLogic();
  }

  private placeWord(
    word: string,
    number: Number,
    direction: string,
    xCoordinate: any,
    yCoordinate: any
  ) {
    let html = "";
    let occupiedCells = [];
    let cellNumber = this._crosswordLogic.coordinatesToCellNumber(
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
        this._solved.includes(Number(card.querySelector(".title").textContent));
    });

    if (everyCardIsSolved) {
      // TODO create you have won notification
      console.log("was not skipped");
      this._state.updateLevelsCleared(this._state.getChosenLevel());
      return;
    }
    console.log("was skipped");

    // select available question cards
    for (
      let i = 0;
      i < questionCards.length || this._selectedQuestionNumber == null;
      i++
    ) {
      let card = questionCards[i];
      let questionCardNumber = Number(card.querySelector(".title").textContent);

      if (
        !this._solved.includes(questionCardNumber) &&
        this._selectedQuestionNumber == null
      ) {
        this._selectedQuestionNumber = questionCardNumber;
        document.querySelector("#cell-number").innerHTML = String(
          this._selectedQuestionNumber
        );
        card.classList.add("active");
        // scrollIntoView
        card.scrollIntoView(false);
      }
    }

    // event handling
    questionCards.forEach((card) => {
      card.addEventListener("click", (e: any) => {
        if (!e.target.classList.contains("active")) {
          if (e.target.classList.contains("cleared")) {
            // TODO play null sound
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

  private bindSubmitEvents() {
    const submitEventHandler = (e: any) => {
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
        textInputContainer.classList.add("is-error");
        setTimeout(() => {
          textInputContainer.classList.remove("is-error");
          textInputContainer.value = "";
        }, 200);
      } else if (
        textInput == this._wordsToSolve[this._selectedQuestionNumber - 1]
      ) {
        // show successful input animation
        textInputContainer.classList.add("is-success");
        setTimeout(() => {
          textInputContainer.classList.remove("is-success");
          textInputContainer.value = "";
        }, 400);

        // set question card as cleared
        let activeQuestionCard = document.querySelector(
          ".question-card.active"
        );
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
                this._crosswordLogic.getBlocksAtCellNumber(cellNumber);
              if (blocksArray.length == 1) {
                let letter = blocksArray[0].querySelector(
                  "span:nth-of-type(1)"
                );
                letter == null
                  ? (blocksArray[0].querySelector("span").style.transform =
                      "scale(1)")
                  : (letter.style.transform = "scale(1)");
              } else if (blocksArray.length == 2) {
                blocksArray[0].querySelector("span").style.transform =
                  "scale(1)";
                blocksArray[1].querySelector("span").style.transform =
                  "scale(1)";
              }
            });
          }
        });
        this._solved.push(this._selectedQuestionNumber);

        // select the next question
        this._selectedQuestionNumber = null;
        this.bindQuestionCardEvents();
      }
    };

    document
      .querySelector("#enter-btn")
      .addEventListener("click", submitEventHandler);

    document.addEventListener("keydown", (e) => {
      if (e.repeat) {
        return;
      }

      if (e.key === "Enter") {
        submitEventHandler(e);
      }
    });
  }

  private startTimer(): any {
    return setInterval(() => {
      if (this._timer.value == 0) {
        // TODO show game over screen
        console.log("Game Ended");
        clearInterval(timerInterval);
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

  public start(state: GameState): void {
    // for now set the game default: level 1
    this._state = state;

    //display the selected level
    this._inGameView.display();
    this._cont = this._inGameView.getCrosswordContainerElement();

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
    this._inGameView.bindReturnEvent(state, this._timerInterval);

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
        console.log(e.target);
      });
    });
  }
}
