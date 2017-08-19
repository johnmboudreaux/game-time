const style = require('./style.css');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const Game = require('./Game.js');
const game = new Game();

const Brick = require('./Brick.js');

const bricks = [];


window.addEventListener('keydown', eventHandler)

function eventHandler(e) {
  e.preventDefault();
  game.paddle.move(e.keyCode)
  pauseGame(e.keyCode)
}

function pauseGame (key) {
  if (key === 32) {
    if (game.ball.velocityY === 0) {
      game.ball.velocityY = -5;
      game.ball.velocityX = 5;
      console.log('if');
    } else {
      game.ball.velocityY = 0;
      game.ball.velocityX = 0;
  }
 }
}


function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (game.gameOn) {
    game.paddle.draw(context);
    game.ball.draw(context, canvas);
    bricks.forEach(brick => {
      brick.draw(context)
    })
    game.ball.move();
    game.ball.wallCollision(canvas, game)
    game.ball.paddleCollision(game.paddle)

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
