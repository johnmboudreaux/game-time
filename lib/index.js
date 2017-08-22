const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const gameStart = document.querySelector('.game-start');

const Game = require('./Game.js');
const game = new Game(context, canvas);

window.addEventListener('keydown', keyPressHandler);
window.addEventListener('mousemove', game.mouseMoveHandler.bind(game), false);

function keyPressHandler(e) {
  e.preventDefault();
  switch (e.keyCode) {
  case 32: // spacebar
    if (game.paused) {
      requestAnimationFrame(game.gameLoop.bind(game));
    }
    game.togglePause()
    break;
  case 39: // right arrow
    game.paddle.move('right', canvas);
    break;
  case 37: // left arrow
    game.paddle.move('left', canvas);
    break;
  }
}

gameStart.addEventListener('click', () => game.start());

// add a button outside of canvas
  // on click: changes text to "restart"
  // act on the button click according to the text on the button

// after the first click (counter that you set)
  // don't run the start code again
