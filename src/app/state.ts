export enum State {
  INITIAL_WARNING = 0,
  GAME_MENU,
  LEVEL_SELECT,
  IN_GAME,
  HINT,
  END,
}

export class GameState {
  private _state: State;
  private _chosenLevel: Number;
  private _clearedLevels: Array<Number>;

  constructor() {
    this._state = State.INITIAL_WARNING;
    this._chosenLevel = 1;
    this._clearedLevels = [];
  }

  public getCurrentState(): State {
    return this._state;
  }

  public setNewState(newState: State) {
    this._state = newState;
  }

  public getClearedLevels(): Array<Number> {
    return this._clearedLevels;
  }

  public updateLevelsCleared(levelCleared: Number): void {
    this._clearedLevels.push(levelCleared);
  }

  public getChosenLevel(): Number {
    return this._chosenLevel;
  }

  public updateChosenLevel(level: Number): void {
    this._chosenLevel = level;
  }
}
