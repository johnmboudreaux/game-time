const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');


class Game {
  constructor(context, canvas) {
    this.lives = 4;
    this.score = 0;
    this.gameOn = false;
    this.canvas = canvas;
    this.context = context;
    this.ball = new Ball(canvas.width / 2, canvas.height - 50, 10, 5, -5);
    this.paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 140, 15);
    this.bricks = [];
    this.paused = false;
    this.levelWon = false;
    this.currentLevel = 1;
    this.levels = {
      2: {
        paddleSize: 120,
        velocityX: 5,
        velocityY: -5
      },
      3: {
        paddleSize: 100,
        velocityX: 15,
        velocityY: -15
      },
      4: {
        paddleSize: 80,
        velocityX: 25,
        velocityY: -25
      }
    }
  }

  loadScreen() {
    this.context.fillStyle = '#FFF';
    this.context.font = 'bold 80px Arial';
    this.context.fillText('BRICK CITY', 150, 120);
    this.context.font = 'bold 30px Arial';
    this.context.fillText('click start', 310, 275);
  }

  newLevel() {
    if (this.lives > 0 && this.bricks.length === 0) {
      this.gameWon();
      this.gameOn = false;
      this.currentLevel += 1;
      this.updateLevel(this.levels[this.currentLevel]);
    }
  }

  updateLevel({ paddleSize, velocityX, velocityY }) {
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height  - 50, this.ball.radius, velocityX, velocityY);
    this.paddle = new Paddle(this.canvas.width / 2 - 120 / 2, this.canvas.height - 30, paddleSize, 15);
    this.constructBrickArray();
    this.levelWon = true;
  }

  drawBallAndPaddle() {
    this.paddle.draw(this.context);
    this.ball.draw(this.context);
  }

  constructBrickArray() {
    for (let row = 0; row < this.currentLevel; row++) {
      for (let column = 0; column < 8; column++) {
        this.bricks.push(new Brick(25 + (90 * column), 70 + (25 * row), 70, 15));
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
      this.togglePause();
      break;
    case 39: // right arrow
      this.moveBoardRight('right', this.canvas);
      break;
    case 37: // left arrow
      this.moveBoardLeft('left', this.canvas);
      break;
    }
  }

  togglePause() {
    this.paused = !this.paused;
  }

  pauseToggleOff() {
    if (!this.paused) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  moveBoardRight(direction, canvas) {
    if (direction === 'right') {
      if (this.paddle.x < canvas.width - (this.paddle.width - 10)) {
        this.paddle.x += 20;
      }
    }
  }

  moveBoardLeft(direction) {
    if (direction === 'left') {
      if (this.paddle.x > 0 + 10) {
        this.paddle.x -= 20;
      }
    }
  }

  livesScoreText() {
    this.context.font = '20px Arial';
    this.context.fillText('Score: ' + this.score, 23, 40);
    this.context.fillText('Lives: ' + this.lives, 660, 40);
  }

  startingBallPosition() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 50;
    this.ball.velocityY = 5;
    this.ball.velocityX = -5;
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

  startGame() {
    if (this.gameStarted) {
      return;
    }
    this.gameStarted = true;
    this.gameOn = true;
    this.constructBrickArray();
    this.score = 0;
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  toggleAnimationFrame() {
    if (this.lives > 0) {
      this.continueGame()
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      this.gameOver();
      cancelAnimationFrame(this.gameLoop)
    }
  }

  continueGame() {
    let self = this;

    if (this.lives > 0 && this.bricks.length > 0 && ! this.levelWon) {
      this.context.font = 'bold 40px Arial';
      this.context.fillText('CLICK to CONTINUE', 190, 275);
      this.canvas.addEventListener('click', function() {
        self.ball.velocityY = -1 * self.ball.velocityY;
        self.gameOn = true;
        self.startGame();
      })
    } else if (this.levelWon) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.font = 'bold 40px Arial';
      this.context.fillText('Click for Next Level', 190, 275);
      this.canvas.addEventListener('click', function() {
        self.ball.velocityY = -1 * self.ball.velocityY;
        self.gameOn = true;
        self.levelWon = false;
        self.startGame();
      })
    }
  }

  gameOver() {
    this.context.font = 'bold 80px Arial';
    this.context.fillText('Game Over', 165, 275);
    this.context.font = 'bold 40px Arial';
    this.context.fillText('click reset to play again', 160, 325);
  }

  gameWon() {
    let self = this;

    if (this.lives > 0 && this.bricks.length === 0) {
      self.gameOn = false;
      this.context.font = 'bold 40px Arial';
      this.context.fillText('Level Cleared', 170, 325);
      this.context.fillText('Click Next Level', 170, 325);
      this.canvas.addEventListener('click', function() {
        self.gameOn = true;
      })
    }
  }

  resetGame() {
    window.location.reload();
    this.startingBallPosition();
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.gameOn) {
      this.drawBallAndPaddle();
      this.bricks.forEach(brick => brick.draw(this.context));
      this.ball.registerCollisions(this.canvas, this);
      this.spliceBricks();
      this.livesScoreText();
      this.ball.move();
      this.newLevel();
      this.gameWon();
      this.pauseToggleOff();
    } else {
      this.drawBallAndPaddle();
      this.startingBallPosition();
      this.toggleAnimationFrame();
    }
  }
}


module.exports = Game;
