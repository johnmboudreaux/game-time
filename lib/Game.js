const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
// const Brick = require('./Brick.js');

class Game {
  constructor (context, canvas) {
    this.lives = 4;
    this.score = 0;
    this.gameOn = false;
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
        console.log(this.paddle.x);
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


  drawAll(canvas, context) {
    this.paddle.draw(context);
    this.ball.draw(context, canvas);
  }

  livesCount() {
    if (this.lives <= 0) {
      this.gameOn = false;
    }
  }
}

module.exports = Game;
