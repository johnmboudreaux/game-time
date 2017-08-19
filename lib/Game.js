const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js')

const style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Game {
  constructor () {
    this.ball = new Ball (canvas.width / 2, canvas.height - 40, 5);
    this.paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);

  }

  draw () {
    this.ball.draw(context, canvas);
    this.paddle.draw();
  }

}


module.exports = Game;
