const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');

class Game {
  constructor (context, canvas) {
    this.lives = 4;
    this.score = 0;
    this.gameOn = true;
    this.ball = new Ball (canvas.width / 2, canvas.height - 50, 10);
    this.paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);
    this.bricks = [];
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

  draw() {

  }

  livesCount() {
    if (this.lives <= 0) {
      this.gameOn = false;
    }
  }
}




module.exports = Game;
