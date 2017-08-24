const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const gameStart = document.querySelector('.game-start');
const gameReset = document.querySelector('.game-reset');
const Game = require('./Game.js');
const game = new Game(context, canvas);

window.addEventListener("load", () => game.loadScreen());
window.addEventListener('mousemove', game.mouseMoveHandler.bind(game), false);
window.addEventListener('keydown', game.keyBoardHandler.bind(game));
gameStart.addEventListener('click', () => game.startGame());
gameReset.addEventListener('click', () => game.resetGame());
