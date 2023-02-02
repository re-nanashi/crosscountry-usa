import { FRAME } from "../globals";
import { GameState, State } from "./state";

export class LevelSelection {
  private _headerContElement: HTMLElement;
  private _gameContElement: HTMLElement;

  constructor() {
    this._headerContElement = document.createElement("section");
    this._gameContElement = document.createElement("section");
  }

  private drawHeaderArea(): void {
    this._headerContElement.setAttribute("id", "game-header-container");
    this._headerContElement.innerHTML = `
      <div class="return-btn-area">
        <div id="return-btn" class="return-btn-placeholder"></div>
      </div>
      <!-- mini logo -->
      <div class="mini-logo-area">
        <div class="mini-logo-placeholder"></div>
      </div>
    `;

    FRAME.appendChild(this._headerContElement);
  }

  private drawGameArea(clearedLevels: Array<Number>): void {
    this._gameContElement.setAttribute("id", "game-content-container");
    this._gameContElement.innerHTML = `
      <!-- level select text -->
      <div class="level-select-text-container">
        <div class="level-select-text-placeholder"></div>
      </div>
      <!-- level list; add "is-disabled" if player can't play that level yet -->
      <div class="levels-container">
        <a id="level-1" class="nes-btn" type="button"
          >Level 1
          <div class="level-star-img-placeholder"></div>
        </a>
        <a id="level-2" class="nes-btn is-disabled" type="button"
          >Level 2
          <div class="level-star-img-placeholder"></div>
        </a>
        <a id="level-3" class="nes-btn is-disabled" type="button"
          >Level 3
          <div class="level-star-img-placeholder"></div>
        </a>
      </div>
    `;

    FRAME.appendChild(this._gameContElement);

    if (clearedLevels.includes(1)) {
      this._gameContElement
        .querySelector("#level-2")
        .classList.remove("is-disabled");
    }

    if (clearedLevels.includes(2)) {
      this._gameContElement
        .querySelector("#level-3")
        .classList.remove("is-disabled");
    }
  }

  private animate(): void {
    const levelSelect = <HTMLElement>(
      document.querySelector("#game-content-container")
    );

    levelSelect.style.transform = "scale(1)";
  }

  public display(clearedLevels: Array<Number>): void {
    this.drawHeaderArea();
    this.drawGameArea(clearedLevels);
    // wait a few secs to animate at the same time with the header
    setTimeout(this.animate, 400);
  }

  public remove(): void {
    let gameContentCont = <HTMLElement>(
      document.querySelector("#game-content-container")
    );

    gameContentCont.style.transform = "scale(0)";
    gameContentCont.remove();
    document.querySelector("#game-header-container").remove();
  }

  public removeGameContentOnly(): void {
    let gameContentCont = <HTMLElement>(
      document.querySelector("#game-content-container")
    );

    gameContentCont.style.transform = "scale(0)";
    gameContentCont.remove();

    // TODO remove button functionality
    let backButton = document.querySelector("#return-btn");
    backButton.removeEventListener("click", () => {});
  }

  public bindEvents(state: GameState): void {
    let backButton = document.querySelector("#return-btn");
    let levels = document.querySelectorAll("div.levels-container > a.nes-btn");

    backButton.addEventListener("click", () => {
      state.setNewState(State.GAME_MENU);
      this.remove();
    });

    levels.forEach((level) => {
      level.addEventListener("click", (e) => {
        let target = <HTMLElement>e.target;
        if (!target.classList.contains("is-disabled")) {
          let levelToPlay: Number = Number(target.id.split("-")[1]);
          state.updateChosenLevel(levelToPlay);
          state.setNewState(State.IN_GAME);
          this.removeGameContentOnly();
        }
        // else play sound
      });
    });
  }
}
