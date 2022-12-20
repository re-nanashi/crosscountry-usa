import "./assets/styles/main.css";
import "./assets/styles/loading.scss";

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
    //initial state
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

  constructor() {
    this.inspectScreenResolution();
  }

  private handleResolutionChangeEvent(e: any): void {
    // if class render(warning) then renderWarningModal
    if (e.matches) {
      console.log("Show Modal");
    } else {
      console.log("Remove modal");
    }
  }

  private inspectScreenResolution() {
    let width = window.matchMedia(`(max-width: ${this.MIN_WIDTH}px)`);
    let height = window.matchMedia(`(max-height: ${this.MIN_HEIGHT}px)`);

    width.addEventListener("change", this.handleResolutionChangeEvent);
    height.addEventListener("change", this.handleResolutionChangeEvent);
  }

  render(stateToRender: State) {
    switch (stateToRender) {
      case State.LOADING:
        renderLoadingScreen();
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
    const currentState = this.context.getCurrentState();
    this.display.render(currentState);
  }
}

const game = new Game();
game.start();
