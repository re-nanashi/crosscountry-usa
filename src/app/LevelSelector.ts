export class LevelSelector {
  private _currentlySelectedLevel: number;
  private _clearedCrosswordLevels: Array<number>;

  constructor() {
    this._currentlySelectedLevel = 1; //default
    this._clearedCrosswordLevels = [];
  }

  public currentlySelectedLevel(): number {
    return this._currentlySelectedLevel;
  }

  public selectLevel(level: number): void {
    this._currentlySelectedLevel = level;
  }

  public getClearedCrosswordLevels(): Array<number> {
    return this._clearedCrosswordLevels;
  }

  public addClearedCrosswordLevel(clearedLevel: number): void {
    this._clearedCrosswordLevels.push(clearedLevel);
  }
}
