import { GAME_CANVAS, MIN_WIDTH, MIN_HEIGHT } from "./globals";

import { ModalType, ModalView } from "./modal";
import { BufferView } from "./buffer";
import { renderLoadingScreen } from "./loading_view";
import { State } from "./game_state";

export class GameView {
  // instantiate screen states views
  private bufferScreen: BufferView;
  private modalScreen: ModalView;

  private isModalCurrentlyShown: Boolean = false;

  constructor() {
    this.bufferScreen = new BufferView();
    this.modalScreen = new ModalView();
    // TODO BIND EVENTS of modalScreen
    //      Proceed to loader button in audio modal

    // this function constantly checks the current display resolution at instantiation
    // TODO
    //this.inspectScreenResolution();
  }

  //TODO: Separate resolution warning code and init caution
  public display(stateToRender: State): any {
    switch (stateToRender) {
      case State.BUFFER:
        this.bufferScreen.display();
        break;
      case State.WARNING_AUDIO:
        this.modalScreen.display(ModalType.AUDIO_ON_REMINDER);
        break;
      case State.WARNING_RES:
      case State.LOADING:
      case State.GAME_MENU:
      case State.LEVEL_SELECT:
      case State.IN_GAME:
      case State.HINT:
      default:
    }
  }
}

/*
  private displayGameScreen() {
    const currentDisplayedScreen: HTMLDivElement =
      this.GAME_CANVAS.querySelector("screen");

    currentDisplayedScreen.style.visibility = "visible";
  }

  // TODO
  private hideGameScreen() {
    const currentDisplayedScreen: HTMLDivElement =
      this.GAME_CANVAS.querySelector("screen");

    currentDisplayedScreen.style.visibility = "hidden";
  }
  */

/*
  // this will show modal if screen resolution requirements are not met
  // and hide temporarily the currently displayed screen
  // this will also show the screen and remove the modal if in case
  // resolutions are met
  private handleResolutionChangeEvent(): void {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    console.log(currentWidth);
    console.log(currentHeight);

    if (currentWidth >= this.MIN_WIDTH && currentHeight >= this.MIN_HEIGHT) {
      if (this.isModalShown) {
        //this.displayGameScreen();
        console.log("Show game screen\n");
        //this.warningScreen.removeModal();
        console.log("Remove modal\n");

        this.isModalShown = false;
      }
    } else {
      if (!this.isModalShown) {
        //this.hideGameScreen();
        console.log("Hide game screen\n");
        //this.warningScreen.showModal();
        console.log("Show modal\n");

        this.isModalShown = true;
      }
    }
  }

  private inspectScreenResolution() {
    let minCanvasResolution = window.matchMedia(
      `(max-width: ${this.MIN_WIDTH}px) and (max-height: ${this.MIN_HEIGHT}px)`
    );

    // initial screen check after render
    this.handleResolutionChangeEvent();

    // constantly checks resolution and handles changes
    minCanvasResolution.addEventListener("change", () => {
      this.handleResolutionChangeEvent();
      console.log("Changes have been made");
    });
  }
  */
