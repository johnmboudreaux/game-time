const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const gameStart = document.querySelector('.game-start');

const Game = require('./Game.js');
const game = new Game(context, canvas);

window.addEventListener('keydown', game.keyBoardHandler.bind(game));
window.addEventListener('mousemove', game.mouseMoveHandler.bind(game), false);
gameStart.addEventListener('click', () => game.start());
