import { LevelSelector } from "./LevelSelector";

export enum GameState {
  INITIAL_WARNING = 0,
  GAME_MENU,
  LEVEL_SELECT,
  IN_GAME,
}

export class GameStateManager {
  private _currentGameState: GameState;
  private _levelSelector: LevelSelector;

  constructor() {
    this._currentGameState = GameState.INITIAL_WARNING;
    this._levelSelector = new LevelSelector();
  }

  public currentGameState(): GameState {
    return this._currentGameState;
  }

  // TODO
  public switch(stateToSwitchTo: GameState): void {
    this._currentGameState = stateToSwitchTo;
  }

  public levelSelector(): LevelSelector {
    return this._levelSelector;
  }
}
