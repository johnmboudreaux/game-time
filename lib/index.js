const Brick = require('./Brick.js');
const Paddle = require('./Paddle.js')
const style = require('./style.css');
const Ball = require('./Ball.js');


const Game = require('./Game.js');
const game = new Game();

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var bricks = []
var paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);


window.addEventListener('keydown', function(e) {
  e.preventDefault();
  paddle.move(e.keyCode)
})

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if(game.gameOn) {
    paddle.draw(context);
    game.ball.draw(context, canvas);
    bricks.forEach(brick => {
      brick.draw(context)
    })
    game.ball.move();
    game.ball.wallCollision(canvas, game)
    game.ball.paddleCollision(paddle)
    // game.livesCount();

    for (var i = 0; i < bricks.length; i++) {
      var brick = bricks[i];
      if (game.ball.brickCollision(brick)) {
        bricks.splice(i, 1)
        game.score++
      }
    }
    context.fillText('Score: ' + game.score, 5, 15)
    context.fillText('Lives: ' + game.lives, 960, 15);

  }
  else{
    game.ball.x = canvas.width / 2;
    game.ball.y = 200;
    // game.ball.velocityX = 0;
    canvas.removeEventListener('click', start);

    if(game.lives > 0){
      context.fillText('Youve Lost A Life', 500, 325);
      canvas.addEventListener('click', function() {
      game.gameOn = true;
    });
    }
    else{
      game.gameOn = false;
      context.fillText('Game Over', 500, 325)
    }
  }
  requestAnimationFrame(gameLoop);
}

function start() {
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 10; column++) {
      bricks.push(new Brick(25 + (100 * column), 25 + (30 * row), 50, 15));
    }
  }
  game.score = 0;
  game.lives = 4;
  requestAnimationFrame(gameLoop)
}


context.fillText('Press Spacebar To Start', 500, 325);
canvas.addEventListener('click', start);
