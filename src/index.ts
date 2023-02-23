// import CSS files
import "nes.css/css/nes.min.css";
import "./assets/styles/loading.scss";
import "./assets/styles/buffer.css";
import "./assets/styles/modal.css";
import "./assets/styles/in-game.css";
import "./assets/styles/main.css";
import "./assets/styles/game-menu.css";
import "./assets/styles/level-selection.css";

// import TS files
import { GameDisplay } from "./app/GameDisplay";
import { GameStateManager } from "./app/GameStateManager";
import { GameManager } from "./app/GameManager";

const _gameDisplay: GameDisplay = new GameDisplay();
const _gameStateManager: GameStateManager = new GameStateManager();
const _gameManager: GameManager = new GameManager();

window.onload = init;

function init() {
  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  _gameDisplay.load(_gameStateManager, _gameManager);

  window.requestAnimationFrame(gameLoop);
}
