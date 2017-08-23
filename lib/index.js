const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const gameStart = document.querySelector('.game-start');

const startNextLevel = document.querySelector('.start-next-level')

const gameReset = document.querySelector('.game-reset');


const Game = require('./Game.js');

const game = new Game(context, canvas);

window.addEventListener('keydown', game.keyBoardHandler.bind(game));
window.addEventListener('mousemove', game.mouseMoveHandler.bind(game), false);
gameStart.addEventListener('click', () => game.start());
gameReset.addEventListener('click', () => game.resetGame());


startNextLevel.addEventListener('click', game.clickNextLevel);


window.addEventListener("load", () => game.loadScreen());
