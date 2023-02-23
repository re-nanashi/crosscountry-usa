import { LOGO_ANIM_LEN } from "../globals";
import { BufferFragment } from "./BufferFragment";
import { LoaderFragment } from "./LoaderFragment";
import { GameMenuScreen } from "./GameMenuScreen";
import { LevelSelectionScreen } from "./LevelSelectionScreen";
import { ModalType, ModalCreator } from "./ModalCreator";
import { GameState, GameStateManager } from "./GameStateManager";
import { GameManager } from "./GameManager";

// audio file imports
import disabledSoundEffect from "../assets/audio/disabled.mp3";
import buttonClickSoundEffect from "../assets/audio/click.mp3";
import backgroundMusic from "../assets/audio/bg.mp3";
import inGameBackgroundMusic from "../assets/audio/ingame.mp3";
import correctSoundEffect from "../assets/audio/correct.mp3";
import gameOverSoundEffect from "../assets/audio/gameover.mp3";
import puzzleSolvedSoundEffect from "../assets/audio/solved.mp3";
import loadCompleteSoundEffect from "../assets/audio/load-complete.mp3";

export class SoundManager {
  private _audioIsOn: true | false;
  private _backgroundMusic: any;
  private _inGameBGM: any;
  private _correctSound: any;
  private _disabledSoundE: any;
  private _clickSoundE: any;
  private _gameOverSound: any;
  private _puzzleSolved: any;
  private _loadComplete: any;

  constructor() {
    this._audioIsOn = false;
    this._backgroundMusic = new Audio(backgroundMusic);
    this._backgroundMusic.loop = true;

    this._inGameBGM = new Audio(inGameBackgroundMusic);
    this._inGameBGM.loop = true;

    this._correctSound = new Audio(correctSoundEffect);

    this._disabledSoundE = new Audio(disabledSoundEffect);
    this._disabledSoundE.volume = 0.3;

    this._clickSoundE = new Audio(buttonClickSoundEffect);
    this._clickSoundE.volume = 0.1;

    this._gameOverSound = new Audio(gameOverSoundEffect);
    this._puzzleSolved = new Audio(puzzleSolvedSoundEffect);

    this._loadComplete = new Audio(loadCompleteSoundEffect);

    this.bindSoundControlClickEvent();
  }

  playLoadComplete = () => {
    this._loadComplete.play();
  };

  playGameOver = () => {
    this._gameOverSound.play();
    this._gameOverSound.currentTime = 0;
  };

  playPuzzleSolved = () => {
    this._puzzleSolved.play();
    this._puzzleSolved.currentTime = 0;
  };

  playCorrect() {
    this._correctSound.currentTime = 0;
    this._correctSound.play();
  }

  playBGM() {
    this._backgroundMusic.volume = 0.08;
    this._backgroundMusic.play();
  }

  stopBGM = () => {
    this._backgroundMusic.pause();
    this._backgroundMusic.currentTime = 0;
  };

  pauseBGM() {
    this._backgroundMusic.pause();
  }

  playInGameBGM() {
    this._inGameBGM.play();
  }

  stopInGameBGM = () => {
    this._inGameBGM.pause();
    this._inGameBGM.currentTime = 0;
  };

  playDisabled() {
    this._disabledSoundE.currentTime = 0;
    this._disabledSoundE.play();
  }

  switch(audioStatus: true | false): void {
    this._audioIsOn = audioStatus;
  }

  status(): true | false {
    return this._audioIsOn;
  }

  bindButtonEvents(): void {
    let allBtns = document.querySelectorAll(".nes-btn");

    allBtns.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        // if sound is on
        console.log("Soundbtn hovered");
      });
    });

    allBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        let target = e.target as HTMLElement;

        if (this._audioIsOn) {
          if (target.classList.contains("is-disabled")) {
            this._disabledSoundE.currentTime = 0;
            this._disabledSoundE.play();
          } else {
            if (target.id != "enter-btn") {
              this._clickSoundE.play();
            } else if (target.hasAttribute("data-number")) {
              console.log("hey");
            }
          }
        }
      });
    });
  }

  bindSoundControlClickEvent(): void {
    let soundBtn = document.querySelector("#sound-btn");

    soundBtn.addEventListener("click", (e) => {
      let target = e.target as HTMLElement;
      if (!target.classList.contains("on")) {
        this._audioIsOn = true;
        this._inGameBGM.muted = false;
        this._backgroundMusic.muted = false;
      } else {
        this._inGameBGM.muted = true;
        this._backgroundMusic.muted = true;
        this._audioIsOn = false;
      }
    });
  }
}

export class GameDisplay {
  private _soundManager: SoundManager;
  private _modalCreator: ModalCreator;

  private _bufferFragment: BufferFragment;
  private _loaderFragment: LoaderFragment;

  private _gameMenuScreen: GameMenuScreen;
  private _levelSelectionScreen: LevelSelectionScreen;

  private _currentlyDisplayedState: GameState;

  constructor() {
    this._soundManager = new SoundManager();
    this._modalCreator = new ModalCreator();
    this._bufferFragment = new BufferFragment();
    this._loaderFragment = new LoaderFragment();
    this._gameMenuScreen = new GameMenuScreen();
    this._levelSelectionScreen = new LevelSelectionScreen();
  }

  public load(stateManager: GameStateManager, gameManager: GameManager) {
    let stateToDisplay: GameState = stateManager.currentGameState();

    // do not change the state if same as previous
    if (this._currentlyDisplayedState === stateToDisplay) {
      return;
    } else {
      switch (stateToDisplay) {
        case GameState.INITIAL_WARNING:
          this._currentlyDisplayedState = stateToDisplay;

          this._bufferFragment.display();
          // TODO create a function to check if resolution is on point
          setTimeout(() => {
            this._modalCreator.create(ModalType.AUDIO_ON_REMINDER);
            this._modalCreator.bindProceedButtonClickEvent(stateManager);

            // !!!
            this._soundManager.bindButtonEvents();
          }, LOGO_ANIM_LEN);

          break;
        case GameState.GAME_MENU:
          const loaderAnimationDuration: number = 4200;
          this._currentlyDisplayedState = stateToDisplay;

          this._loaderFragment.display(this._soundManager.playLoadComplete);
          // wait for loader to finish before displaying menu
          setTimeout(() => {
            this._gameMenuScreen.display();

            // wait for animations to finish
            setTimeout(() => {
              this._gameMenuScreen.bindPlayClickEvent(stateManager);

              // !!!
              this._soundManager.playBGM();
              this._soundManager.bindButtonEvents();
            }, LOGO_ANIM_LEN + 100);
          }, loaderAnimationDuration);

          break;
        case GameState.LEVEL_SELECT:
          this._currentlyDisplayedState = stateToDisplay;

          setTimeout(() => {
            this._levelSelectionScreen.display(
              stateManager.levelSelector().getClearedCrosswordLevels()
            );
            // wait for animations to finish
            setTimeout(() => {
              this._levelSelectionScreen.bindEvents(
                stateManager,
                this._soundManager
              );
            }, 1000);

            // !!!
            this._soundManager.bindButtonEvents();
          }, 300);

          break;
        case GameState.IN_GAME:
          this._currentlyDisplayedState = stateToDisplay;

          // load the in-game screen
          gameManager.start(stateManager, this._soundManager);

          // !!!
          this._soundManager.bindButtonEvents();
          break;
        default:
          break;
      }
    }
  }
}
