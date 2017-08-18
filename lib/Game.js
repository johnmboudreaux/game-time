const Ball = require('./Ball.js');
const style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Game {
  constructor () {
    this.ball = new Ball (canvas.width / 2, canvas.height - 40, 5);
  }

  draw () {
    this.ball.draw(context, canvas);
  }

}


module.exports = Game;
