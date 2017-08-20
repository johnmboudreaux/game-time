const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const Game = require('./Game.js');
const game = new Game(context, canvas);

const Brick = require('./Brick.js');

const bricks = [];


window.addEventListener('keydown', eventHandler);
document.addEventListener("mousemove", mouseMoveHandler, false);


function eventHandler(e) {
  e.preventDefault();
  game.paddle.move(e.keyCode, canvas);
  game.pause(e.keyCode);
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;

  if (relativeX > 0 && relativeX < canvas.width) {
    game.paddle.x = relativeX - game.paddle.width / 2;
  }
}



// function startButton(key) {
//   if (key == 83) {
//     start();
//   }
// }


function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (game.gameOn) {
    game.paddle.draw(context);
    game.ball.draw(context, canvas);
    bricks.forEach(brick => {
      brick.draw(context);
    });
    game.ball.move();
    game.ball.wallCollision(canvas, game);
    game.ball.paddleCollision(game.paddle);

    for (let i = 0; i < bricks.length; i++) {
      let brick = bricks[i];

      if (game.ball.brickCollision(brick)) {
        bricks.splice(i, 1);
        game.score++;
      }
    }
    context.fillText('Score: ' + game.score, 5, 15);
    context.fillText('Lives: ' + game.lives, 960, 15);
  } else {
    game.ball.x = canvas.width / 2;
    game.ball.y = 200;
    // game.ball.velocityX = 0;
    canvas.removeEventListener('click', start);

    if (game.lives > 0) {
      context.fillText('You Dead Sucka', 500, 325);
      canvas.addEventListener('click', function() {
        game.gameOn = true;
      });
    } else {
      game.gameOn = false;
      context.fillText('Game Over', 500, 325);
      var gameOver = document.getElementById('gameOverContainer');
        gameOver.style.display = 'block';
    }
  }
  requestAnimationFrame(gameLoop);
}

function start() {
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 10; column++) {
      bricks.push(new Brick(25 + (100 * column), 25 + (30 * row), 50, 15));
    }
  }
  game.score = 0;
  game.lives = 4;
  requestAnimationFrame(gameLoop);
}


context.fillText('Click To Start', 500, 325);
canvas.addEventListener('click', start);
