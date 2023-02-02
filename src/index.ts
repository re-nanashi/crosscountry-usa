import "nes.css/css/nes.min.css";
import "./assets/styles/loading.scss";
import "./assets/styles/buffer.css";
import "./assets/styles/modal.css";
import "./assets/styles/in-game.css";
import "./assets/styles/main.css";
import "./assets/styles/game-menu.css";
import "./assets/styles/level-selection.css";

import { GameState } from "./app/state";
import { GameView } from "./app/screen";

const _view: GameView = new GameView();
const _context: GameState = new GameState();

window.onload = init;

function init() {
  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  _view.display(_context);

  window.requestAnimationFrame(gameLoop);
}
