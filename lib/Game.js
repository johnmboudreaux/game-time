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
  }

  togglePause() {
    this.paused = !this.paused
  }

  drawAll() {
    this.paddle.draw(this.context);
    this.ball.draw(this.context, this.canvas);
  }

  populateBoard() {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 10; column++) {
        this.bricks.push(new Brick(25 + (97 * column), 25 + (29 * row), 70, 15));
      }
    }
  }

  mouseMoveHandler(e) {
    let relativeX = e.clientX - this.canvas.offsetLeft;

    if (relativeX < (this.paddle.width / 2)) {
      this.paddle.x = 0;
    } else if (relativeX > this.canvas.width) {
      this.paddle.x = this.canvas.width - this.paddle.width;
    } else if (relativeX > (this.paddle.width / 2) && relativeX < this.canvas.width - (this.paddle.width / 2)) {
      this.paddle.x = relativeX - (this.paddle.width / 2);
    }
  }

  keyBoardHandler(e) {
    e.preventDefault();
    switch (e.keyCode) {
    case 32: // spacebar
      if (this.paused) {
        requestAnimationFrame(this.gameLoop.bind(this));
      }
      this.togglePause()
      break;
    case 39: // right arrow
      this.paddle.move('right', this.canvas);
      break;
    case 37: // left arrow
      this.paddle.move('left', this.canvas);
      break;
    }
  }


  livesCount() {
    if (this.lives <= 0) {
      this.gameOn = false;
    }
  }

  spliceBricks() {
    for (let i = 0; i < this.bricks.length; i++) {
      let brick = this.bricks[i];

      if (this.ball.brickCollision(brick)) {
        this.bricks.splice(i, 1);
        this.score++;
      }
    }
  }
  fillText() {
    this.context.fillText('Score: ' + this.score, 5, 15);
    this.context.fillText('Lives: ' + this.lives, 960, 15);
  }

  startingBallPosition() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = 200;
  }

  continueGame() {
    let self = this;

    this.context.fillText('Click to continue', 500, 325);
    this.canvas.addEventListener('click', function() {
      self.gameOn = true;
      // reloop
    })
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.gameOn) {
      this.drawAll()
      this.bricks.forEach(brick => brick.draw(this.context));
      this.ball.registerCollisions(this.canvas, this)
      this.ball.move()
      this.spliceBricks()
      this.fillText()
    } else {
      this.startingBallPosition()
      // shouldGameContinue()
      if (this.lives > 0) {
        this.continueGame()
      } else {
        this.gameOn = false;
      }
    }
    if (!this.paused) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  // shouldGameContinue() {}

  // pull out to other function 'populateBoard' --> start/die

  start() {
    if (this.gameStarted) {
      return;
    }
    this.gameStarted = true;
    this.gameOn = true;
    this.populateBoard();
    this.score = 0;
    this.lives = 4;
    requestAnimationFrame(this.gameLoop.bind(this));

  }
}



module.exports = Game;
