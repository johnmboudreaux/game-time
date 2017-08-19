const style = require('./style.css');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const Game = require('./Game.js');
const game = new Game();
const Brick = require('./Brick.js');




const bricks = [];


window.addEventListener('keydown', function(e) {
  e.preventDefault();
  game.paddle.move(e.keyCode)
})

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(gameLoop);
  game.paddle.draw(context);
  game.ball.draw(context, canvas);
  bricks.forEach(brick => {
    brick.draw(context)
  })
  game.ball.move();
  game.ball.wallCollision(canvas)
  game.ball.paddleCollision(game.paddle)

    // create bricks

  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];

    if (
      game.ball.x > brick.x &&
      game.ball.x < brick.x + brick.width &&
      game.ball.y > brick.y &&
      game.ball.y < brick.y + brick.height
    ) {
      bricks.splice(i, 1)
      game.ball.velocityX = -game.ball.velocityX;
      game.ball.velocityY = -game.ball.velocityY;
    }
  }
}

for (var row = 0; row < 3; row++) {
  for (var column = 0; column < 10; column++) {
    bricks.push(new Brick(25 + (100 * column), 25 + (30 * row), 50, 15));
  }
}


requestAnimationFrame(gameLoop);
