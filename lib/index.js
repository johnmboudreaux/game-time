const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const gameStart = document.querySelector('.game-start');

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

  if (relativeX > (game.paddle.width / 2) && relativeX < canvas.width - (game.paddle.width / 2)) {
    game.paddle.x = relativeX - (game.paddle.width / 2);
  }
}

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (game.gameOn) {
    game.drawAll(canvas, context)
    bricks.forEach(brick => brick.draw(context));


    game.ball.registerCollisions(canvas, game)
    game.ball.move();


    // removeBricksIfNeeded///
    for (let i = 0; i < bricks.length; i++) {
      let brick = bricks[i];

      if (game.ball.brickCollision(brick)) {
        bricks.splice(i, 1);
        game.score++;
      }
    }

    //
    context.fillText('Score: ' + game.score, 5, 15);
    context.fillText('Lives: ' + game.lives, 960, 15);
  } else {
    game.ball.x = canvas.width / 2;
    game.ball.y = 200;
    // canvas.removeEventListener('click', start);


    // shouldGameContinue()
    if (game.lives > 0) {
      context.fillText('Click to continue', 500, 325);
      canvas.addEventListener('click', function() {
        game.gameOn = true;
        // reloop
      });
    } else {
      game.gameOn = false;
    }
  }
  requestAnimationFrame(gameLoop);
}

function start() {
  if (game.gameOn) {
    return;
  }
  game.gameOn = true;
  // pull out to other function 'populateBoard' --> start/die
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 10; column++) {
      bricks.push(new Brick(25 + (97 * column), 25 + (29 * row), 70, 15));
    }
  }
  game.score = 0;
  game.lives = 4;
  requestAnimationFrame(gameLoop);
}


// context.fillText('Click To Start', 500, 325);
// canvas.addEventListener('click', start);
gameStart.addEventListener('click', start);

// add a button outside of canvas
  // on click: changes text to "restart"
  // act on the button click according to the text on the button

// after the first click (counter that you set)
  // don't run the start code again
