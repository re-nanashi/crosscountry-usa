class GameView {
  readonly MIN_WIDTH: number = 1080;
  readonly MIN_HEIGHT: number = 720;
  readonly GAME_CANVAS = <HTMLDivElement>document.getElementById("game-canvas");

  // instantiate screen states views
  //private warningScreen: WarningView;

  private currentCanvasWidth: number;
  private currentCanvasHeight: number;

  private isModalShown: Boolean = false;

  constructor() {
    // create this WarningView class
    //this.warningScreen = new WarningView();

    // this function constantly checks the current display resolution
    this.inspectScreenResolution();
  }

  private displayGameScreen() {
    const currentDisplayedScreen: HTMLDivElement =
      this.GAME_CANVAS.querySelector("screen");

    currentDisplayedScreen.style.visibility = "visible";
  }

  private hideGameScreen() {
    const currentDisplayedScreen: HTMLDivElement =
      this.GAME_CANVAS.querySelector("screen");

    currentDisplayedScreen.style.visibility = "hidden";
  }

  // this will show modal if screen resolution requirements are not met
  // and hide temporarily the currently displayed screen
  // this will also show the screen and remove the modal if in case
  // resolutions are met
  private handleResolutionChangeEvent(e: any): void {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    if (currentWidth >= this.MIN_WIDTH && currentHeight >= this.MIN_HEIGHT) {
      if (this.isModalShown) {
        this.displayGameScreen();
        //this.warningScreen.removeModal();
        // TODO
        //removeWarningModal();

        this.isModalShown = false;
      }
    } else {
      if (!this.isModalShown) {
        this.hideGameScreen();
        //this.warningScreen.showModal();
        //displayWarningModal();

        this.isModalShown = true;
      }
    }
  }

  // Multiple scenarios that might occur:
  // 1st scenario: width is >=1080 and height is >=720
  //            if isModalShown is true  {
  //                1. remove the modal
  //                2. show the screen
  //                3. isModalShown = false
  //            } else {
  //                do nothing
  //            }
  // 2nd scenario: width is <1080 and height is >=720
  //            if isModalShown is true {
  //                do nothing
  //            } else if isModalShown is false {
  //                1. hide the visibility of the screen
  //                2. display the modal
  //                3. isModalShown = true
  //            }
  // 3rd scenario: width is >=1080 and height is <720
  //            if isModalShown is true {
  //                do nothing
  //            } else if isModalShown is false {
  //                1. hide the visibility of the screen
  //                2. display the modal
  //                3. isModalShown = true
  //            }
  //
  // 4th scenario: width is <1080 and height is <720
  //            if isModalShown is true {
  //                do nothing
  //            } else if isModalShown is false {
  //                1. hide the visibility of the screen
  //                2. display the modal
  //                3. isModalShown = true
  //            }
  private inspectScreenResolution() {
    let minCanvasResolution = window.matchMedia(
      `(max-width: ${this.MIN_WIDTH}px) and (max-height: ${this.MIN_HEIGHT}px)`
    );

    minCanvasResolution.addEventListener(
      "change",
      this.handleResolutionChangeEvent
    );
  }
}
