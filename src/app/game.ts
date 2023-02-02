import { FRAME } from "../globals";

export class Game {
  private _headerContElement: HTMLElement;
  private _gameContElement: HTMLElement;
  private _container: HTMLElement;
  private _cells: Array<any>;
  private _timer: any;

  private _selectedQuestionNumber: Number;
  private _solved: Array<Number>;
  private _data: any;
  private _wordsToSolve: Array<string>;

  constructor() {
    this._gameContElement = document.createElement("div");

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
  }

  private coordinatesToCellNumber(x: any, y: any) {
    return (y / 6.25) * 16 + x / 6.25;
  }

  private cellNumberToX(cellNumber: any) {
    return (cellNumber % 16) * 6.25;
  }

  private cellNumberToY(cellNumber: any) {
    return Math.trunc(cellNumber / 16) * 6.25;
  }

  private marginLeft(block: any) {
    return Number(block.style.marginLeft.split("%")[0]);
  }

  private marginTop(block: any) {
    return Number(block.style.marginTop.split("%")[0]);
  }

  private invertDirection(direction: string) {
    return direction == "horizontal" ? "vertical" : "horizontal";
  }

  private blocks() {
    return document.querySelectorAll(".block");
  }

  private getBlocksAtCellNumber(cellNumber: Number): any[] {
    let blocksFound: any[] = [];
    blocks().forEach((block) => {
      if (
        marginLeft(block) == cellNumberToX(cellNumber) &&
        marginTop(block) == cellNumberToY(cellNumber)
      ) {
        blocksFound.push(block);
      }
    });
    return blocksFound;
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
    let cellNumber = coordinatesToCellNumber(xCoordinate, yCoordinate);

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

    container.insertAdjacentHTML("beforeend", html);

    data.push({ qnum: number, occupied: occupiedCells });

    return occupiedCells;
  }

  private drawRestOfHeaderArea(): void {
    this._headerContElement = document.querySelector("#game-header-container");

    let levelIndicatorArea = document.createElement("div");
    let timerArea = document.createElement("div");

    levelIndicatorArea.classList.add("level-indicator-area");
    timerArea.classList.add("timer-area");

    levelIndicatorArea.innerHTML = `
      Level
      <div class="level-star-img-placeholder"></div>
    `;

    timerArea.innerHTML = `
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

    this._headerContElement.appendChild(levelIndicatorArea);
    this._headerContElement.appendChild(timerArea);

    this._timer = document.querySelector(
      ".progress-container > progress.nes-progress"
    );
  }

  private generateTable(): string {
    let htmlString = `<div class="cell"></div>`;
    let source = `\n<div class="cell"></div>`;
    for (let i = 0; i < 255; i++) {
      htmlString += source;
    }

    return htmlString;
  }

  private drawGameContent(): void {
    let crosswordCont = document.createElement("section");
    let questionsCont = document.createElement("section");

    this._gameContElement.setAttribute("id", "game-content-container-ig");
    crosswordCont.setAttribute("id", "crossword-container");
    questionsCont.setAttribute("id", "questions-container");

    let tableCont = document.createElement("div");
    let _cont = document.createElement("div");
    tableCont.setAttribute("id", "table-container");
    _cont.setAttribute("id", "_cont");
    // generate table
    _cont.innerHTML = this.generateTable();

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
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">6</p>
          <p>This man's name was given to the capital of the USA</p>
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">9</p>
          <p>A neighboring country of the USA</p>
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">10</p>
          <p>
            A significant percentage of this natural phenomenon occurs in
            the USA
          </p>
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
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
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>

        <!-- if cleared, add "cleared" to styling -->
        <div class="nes-container with-title is-centered question-card">
          <p class="title">2</p>
          <p>The number of stars on the US flag</p>
          <!-- if cleared, add "is-disabled" to styling -->
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
          <!-- if cleared, add indicator html code -->
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">3</p>
          <p>The oldest national park in the world</p>
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">4</p>
          <p>The national bird of the USA</p>
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">7</p>
          <p>The most famous waterfall in North America</p>
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>

        <div class="nes-container with-title is-centered question-card">
          <p class="title">8</p>
          <p>Third most populated city in the USA</p>
          <a class="nes-btn nes-btn-custom" type="button">Hint</a>
        </div>
        <!-- END ADDING DOWN QUESTIONS HERE -->
      </div>
    `;

    // append to parent both the crossword and questions
    this._gameContElement.appendChild(crosswordCont);
    this._gameContElement.appendChild(questionsCont);

    // append to FRAME
    FRAME.appendChild(this._gameContElement);

    // find the after rendering
    this._cells = <any>document.querySelectorAll(".cell");
  }

  public start(): void {
    this.drawRestOfHeaderArea();
    this.drawGameContent();
  }
}
