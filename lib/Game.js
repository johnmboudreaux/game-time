const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js')
const Brick = require('./Brick.js');
const style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Game {
  constructor () {

    this.lives = 4;
    this.score = 0;
    this.gameOn = true;
    this.ball = new Ball (canvas.width / 2, canvas.height - 50, 20);
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
    this.ball.draw(context, canvas);
    this.paddle.draw();
  }

  livesCount() {
    if (this.lives <= 0) {
      this.gameOn = false;
    }
  }

}




module.exports = Game;
