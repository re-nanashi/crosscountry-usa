enum State {
  LOADING,
  WARNING,
  GAME_INTRO,
  LEVEL_SELECT,
  IN_GAME,
  HINT,
}

class GameState {
  private state: State;
  private level: number = 1;
  private score: number = 0;
  private timeRemaining: number;

  constructor() {
    // default/initial game state
    this.state = State.LOADING;
  }

  getCurrentState(): State {
    return this.state;
  }

  setNewState(newState: State) {
    this.state = newState;
  }
}
