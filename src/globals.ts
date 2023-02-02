export const CANVAS: HTMLDivElement = <HTMLDivElement>(
  document.getElementById("canvas")
);

export const FRAME: HTMLDivElement = <HTMLDivElement>(
  document.getElementById("frame-container")
);

export enum ModalType {
  SCREEN_RESOLUTION_WARNING,
  AUDIO_ON_REMINDER,
  TIME_LIMIT_IS_UP_NOTIF,
  GAME_CLEARED_NOTIF,
}

export const LOGO_ANIM_LEN = 1400;
export const EXIT_ANIM_LEN = 300;
