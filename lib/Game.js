const Ball = require('./Ball.js');
const style = require('./style.css');


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Game {
  constructor () {
    this.ball = new Ball (canvas.width / 2, canvas.height - 40, 5);
    this.lives = 4;
    this.score = 0;
  }

  draw() {
    this.ball.draw(context, canvas);
  }

  livesCount() {
    gameOn = true;
    if(this.lives < 0) {
      gameOn = false;
    }
  }

  scoreKeeper(brickCount) {
    // ifthe brick count is greater than the expected brickCount
    // then the game is on. if brickcount is less than 

    }
  }

}


module.exports = Game;
