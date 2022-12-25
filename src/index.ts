import "./assets/styles/main.css";
import "./assets/styles/loading.scss";
import "nes.css/css/nes.min.css";

import { renderLoadingScreen } from "./app/loading_view";
import { renderWarningModal } from "./app/warning_view";

enum State {
  LOADING,
  WARNING,
  GAME_INTRO,
  LEVEL_SELECT,
  IN_GAME,
  HINT,
}

//GameState
class GameState {
  private state: State;

  constructor() {
    //initial/default state
    this.state = State.LOADING;
  }

  getCurrentState(): State {
    return this.state;
  }

  setNewState(newState: State) {
    this.state = newState;
  }
}

//GameView
class GameView {
  readonly MIN_WIDTH: number = 1080;
  readonly MIN_HEIGHT: number = 720;
  private GAME_CANVAS = <HTMLDivElement>document.getElementById("game-canvas");

  constructor() {
    this.inspectScreenResolution();
  }

  private handleResolutionChangeEvent(e: any): void {
    // if class render(warning) then renderWarningModal
    if (e.matches) {
      console.log("Show modal");
    } else {
      console.log("remove modal");
    }
  }

  // TODO check on the start of game if resolution requirements are met.
  private inspectScreenResolution() {
    let isModalShown: Boolean = false;
    let minHxW = window.matchMedia(
      `(max-width: ${this.MIN_WIDTH}px) and (max-height: ${this.MIN_HEIGHT}px)`
    );

    minHxW.addEventListener("change", this.handleResolutionChangeEvent);
  }

  render(stateToRender: State) {
    switch (stateToRender) {
      case State.LOADING:
        renderLoadingScreen();
        break;
      case State.WARNING:
        renderWarningModal();
        break;
    }
  }
}

class Game {
  private context: GameState;
  private display: GameView;

  constructor() {
    this.context = new GameState();
    this.display = new GameView();
  }

  start() {
    let currentState = this.context.getCurrentState();
    this.display.render(currentState);
    this.context.setNewState(State.WARNING);
    currentState = this.context.getCurrentState();
    setTimeout(() => {
      this.display.render(currentState);
    }, 4200);
  }
}

const game = new Game();
game.start();
