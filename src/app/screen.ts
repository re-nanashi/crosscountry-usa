import { Buffer } from "../app/buffer";
import { ModalCreator } from "../app/modal";
import { ModalType, LOGO_ANIM_LEN } from "../globals";
import { GameState, State } from "../app/state";
import { Loader } from "../app/loader";
import { GameMenu } from "./menu";
import { LevelSelection } from "./level";
import { Game } from "./game";

export class GameView {
  private _buffer: Buffer;
  private _modal: ModalCreator;
  private _loader: Loader;
  private _menu: GameMenu;
  private _levelSelect: LevelSelection;
  private _game: Game;

  private _currentDisplay: State;

  constructor() {
    this._buffer = new Buffer();
    this._modal = new ModalCreator();
    this._loader = new Loader();
    this._menu = new GameMenu();
    this._levelSelect = new LevelSelection();

    this._game = new Game();
  }

  public display(currentState: GameState) {
    let stateToDisplay: State = currentState.getCurrentState();

    // Do not change the state if same as previous
    if (this._currentDisplay === stateToDisplay) {
      return;
      // Change state
    } else {
      switch (stateToDisplay) {
        case State.INITIAL_WARNING:
          this._currentDisplay = stateToDisplay;
          this._buffer.display();
          // create function to check if resolution is on point

          setTimeout(() => {
            this._modal.create(ModalType.AUDIO_ON_REMINDER);
            this._modal.bindProceedEvent(currentState);
          }, 1400);

          break;
        case State.GAME_MENU:
          this._currentDisplay = stateToDisplay;

          this._loader.displayLoader();
          // wait for loader to finish
          setTimeout(() => {
            this._menu.display();

            // wait for animations
            setTimeout(() => {
              this._menu.bindPlayEvent(currentState);
            }, LOGO_ANIM_LEN + 100);
          }, 4200);

          break;
        case State.LEVEL_SELECT:
          this._currentDisplay = stateToDisplay;

          setTimeout(() => {
            this._levelSelect.display(currentState.getClearedLevels());

            // wait for animations
            setTimeout(() => {
              this._levelSelect.bindEvents(currentState);
            }, 1000);
          }, 300);
          break;

        case State.IN_GAME:
          this._currentDisplay = stateToDisplay;
          this._game.start();
          break;
        default:
          break;
      }
    }
  }
}
