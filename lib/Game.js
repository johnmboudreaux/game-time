const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');

class Game {
  constructor (context, canvas) {
    this.lives = 4;
    this.score = 0;
    this.gameOn = false;
    this.canvas = canvas;
    this.context = context;
    this.ball = new Ball (canvas.width / 2, canvas.height - 50, 10);
    this.paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);
    this.bricks = [];
    this.paused = false;
    this.previousTime = new Date()
  }

  pause(key) {
    if (key === 32) {
      if (this.ball.velocityY === 0) {
        this.ball.velocityY = -5;
        this.ball.velocityX = 5;
      } else {
        this.ball.velocityY = 0;
        this.ball.velocityX = 0;
      }
    }
  }

//   togglePause(key) {
//     if (key === 32) {
//     if (!this.paused) {
//       this.paused = true;
//     } else if (this.paused) {
//       this.paused = false;
//       this.previousTime
//     }
//   }
// }

  drawAll() {
    this.paddle.draw(this.context);
    this.ball.draw(this.context, this.canvas);
    // this.makeBricks(context);
    // this.drawBricks(context)
  }

  // makeBricks() {
  //   // make all of our bricks...
  //   for (let row = 0; row < 3; row++) {
  //     for (let column = 0; column < 10; column++) {
  //       this.bricks.push(new Brick(25 + (100 * column), 25 + (30 * row), 50, 15));
  //     }
  //   }
  // }

  // drawBricks(context) {
  //   // loop over this.bricks
  //   this.bricks.forEach(brick => brick.draw(context));
  // }

  livesCount() {
    if (this.lives <= 0) {
      this.gameOn = false;
    }
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gameOn) {
      this.drawAll()
      this.bricks.forEach(brick => brick.draw(this.context));

      this.ball.registerCollisions(this.canvas, this)
      this.ball.move();

      // removeBricksIfNeeded///
      for (let i = 0; i < this.bricks.length; i++) {
        let brick = this.bricks[i];

        if (this.ball.brickCollision(brick)) {
          this.bricks.splice(i, 1);
          this.score++;
        }
      }

      this.context.fillText('Score: ' + this.score, 5, 15);
      this.context.fillText('Lives: ' + this.lives, 960, 15);
    } else {
      this.ball.x = this.canvas.width / 2;
      this.ball.y = 200;
      let self = this;

      // shouldGameContinue()
      if (this.lives > 0) {
        this.context.fillText('Click to continue', 500, 325);
        this.canvas.addEventListener('click', function() {
          self.gameOn = true;
          // reloop
        });
      } else {
        this.gameOn = false;
      }
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  start() {
    if (this.gameStarted) {
      return;
    }
    this.gameStarted = true;
    this.gameOn = true;
    // pull out to other function 'populateBoard' --> start/die
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 10; column++) {
        this.bricks.push(new Brick(25 + (97 * column), 25 + (29 * row), 70, 15));
      }
    }
    this.score = 0;
    this.lives = 4;
    requestAnimationFrame(this.gameLoop.bind(this));
  }

}



module.exports = Game;
