import { FRAME } from "../globals";
import { GameState, GameStateManager } from "./GameStateManager";
import { SoundManager } from "./GameDisplay";

export class LevelSelectionScreen {
  private _headerComponent: HTMLElement;
  private _levelSelectContentComponent: HTMLElement;

  constructor() {
    this._headerComponent = document.createElement("section");
    this._levelSelectContentComponent = document.createElement("section");
  }

  private createHeaderComponent(): void {
    let headerComponent = document.querySelector("#game-header-container");

    if (!headerComponent) {
      this._headerComponent.setAttribute("id", "game-header-container");
      this._headerComponent.innerHTML = `
        <div class="return-btn-area">
          <div id="return-btn" class="return-btn-placeholder"></div>
        </div>
        <!-- mini logo -->
        <div class="mini-logo-area">
          <div class="mini-logo-placeholder"></div>
        </div>
      `;

      FRAME.appendChild(this._headerComponent);
    }
  }

  private createLevelSelectContentComponent(
    clearedLevels: Array<number>
  ): void {
    this._levelSelectContentComponent.setAttribute(
      "id",
      "game-content-container"
    );
    this._levelSelectContentComponent.innerHTML = `
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

    FRAME.appendChild(this._levelSelectContentComponent);

    /*
     * DISABLE FOR NOW
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
    */
  }

  public bindEvents(
    stateManager: GameStateManager,
    soundManager: SoundManager
  ): void {
    let backButton = document.querySelector("#return-btn");
    let levels = document.querySelectorAll("div.levels-container > a.nes-btn");

    const handleReturnButton = (): void => {
      stateManager.switch(GameState.GAME_MENU);
      soundManager.stopBGM();
      this.remove();
    };

    const removeGameContentOnly = (): void => {
      let gameContentCont = <HTMLElement>(
        document.querySelector("#game-content-container")
      );

      gameContentCont.style.transform = "scale(0)";
      gameContentCont.remove();

      //  remove button functionality
      backButton.removeEventListener("click", handleReturnButton);
    };

    // event listeners
    backButton.addEventListener("click", handleReturnButton);

    // TODO??
    /*
    backButton.addEventListener("click", () => {
      state.setNewState(State.GAME_MENU);
      this.remove();
    });
    */

    levels.forEach((level) => {
      level.addEventListener("click", (e) => {
        let target = <HTMLElement>e.target;
        if (!target.classList.contains("is-disabled")) {
          let levelToPlay: number = Number(target.id.split("-")[1]);

          stateManager.levelSelector().selectLevel(levelToPlay);
          stateManager.switch(GameState.IN_GAME);
          removeGameContentOnly();
        }
        // else play sound
      });
    });
  }

  private animateEntrance(): void {
    const levelSelectContent = <HTMLElement>(
      document.querySelector("#game-content-container")
    );

    levelSelectContent.style.transform = "scale(1)";
  }

  public display(clearedLevels: Array<number>): void {
    this.createHeaderComponent();
    this.createLevelSelectContentComponent(clearedLevels);

    // wait a few seconds to animate at the same time with the header
    setTimeout(this.animateEntrance, 400);
  }

  public remove(): void {
    let levelSelectContent = <HTMLElement>(
      document.querySelector("#game-content-container")
    );

    levelSelectContent.style.transform = "scale(0)";
    levelSelectContent.remove();
    document.querySelector("#game-header-container").remove();
  }
}
