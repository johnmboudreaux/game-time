const Ball = require('./Ball.js');
const style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Game {
  constructor () {
    this.ball = new Ball (canvas.width / 2, canvas.height - 80, 5);
    this.lives = 4;
    this.score = 0;
    this.gameOn = true;
  }

  draw() {
    this.ball.draw(context, canvas);
  }

  livesCount() {
    if(this.lives <= 0) {
      this.gameOn = false;
    }
  }

}




module.exports = Game;
