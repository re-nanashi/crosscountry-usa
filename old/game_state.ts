export enum State {
  BUFFER,
  WARNING_AUDIO,
  WARNING_RES,
  LOADING,
  GAME_MENU,
  LEVEL_SELECT,
  IN_GAME,
  HINT,
  END,
}

//GameState
export class GameState {
  private state: State;

  constructor() {
    //initial/default state
    this.state = State.BUFFER;
  }

  getCurrentState(): State {
    return this.state;
  }

  setNewState(newState: State) {
    this.state = newState;
  }
}
