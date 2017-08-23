const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const Brick = require('./Brick.js');

class Game {
  constructor(context, canvas) {
    this.lives = 2;
    this.score = 0;
    this.gameOn = false;
    this.canvas = canvas;
    this.context = context;
    this.ball = new Ball(canvas.width / 2, canvas.height - 50, 10, 5, -5);
    this.paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);
    this.bricks = [];
    this.paused = false;

    this.currentLevel = 1
    this.levels = {
      2: {
        rows: 1,
        columns: 1,
        paddleSize: 80,
        ballVY: -10,
        ballVX: 10
      },
      3: {
        rows: 4,
        columns: 6,
        paddleSize: 40,
        ballVY: -20,
        ballVX: 20
      },
      4: {
        rows: 6,
        columns: 8,
        paddleSize: 10,
        ballVY: -40,
        ballVX: 40
      }
    }
  }

  loadScreen() {
    this.context.fillText('Welcome' , 400, 225);

  }

  updateLevel({ rows, columns, paddleSize, ballVY, ballVX }) {
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height - 50, this.ball.radius, ballVY, ballVX);
    this.paddle = new Paddle(this.canvas.width / 2 - 120 / 2, this.canvas.height - 30, paddleSize, 15);
    this.constructBrickArray();
    console.log(arguments);
  }

  newLevel() {
    if (this.lives >= 0 && this.bricks.length === 0) {
      this.currentLevel += 1
      this.updateLevel(this.levels[this.currentLevel])
      console.log('newlevel');
    }
  }

  togglePause() {
    this.paused = !this.paused
  }

  drawBallAndPaddle() {
    this.paddle.draw(this.context);
    this.ball.draw(this.context);
  }

  constructBrickArray(rows, columns) {
    for (let row = 0; row < 1; row++) {
      for (let column = 0; column < 1; column++) {
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
      this.moveBoardRight('right', this.canvas);
      break;
    case 37: // left arrow
      this.moveBoardLeft('left', this.canvas);
      break;
    }
  }

  moveBoardRight(direction, canvas) {
    if (direction === 'right')  {
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

    this.context.font = 'bold 40px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('CLICK to CONTINUE', 500, 325);
    this.canvas.addEventListener('click', function() {
      self.gameOn = true;
      self.start()
    })
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.gameOn) {
      this.drawBallAndPaddle()
      this.bricks.forEach(brick => brick.draw(this.context));
      this.ball.registerCollisions(this.canvas, this)
      this.ball.move()
      this.spliceBricks()
      this.fillText()
      this.newLevel()
      this.pauseToggleOff()
    } else {
      this.startingBallPosition()
      this.toggleAnimationFrame()
    }
  }

  pauseToggleOff() {
    if (!this.paused) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  toggleAnimationFrame() {
    if (this.lives > 0) {
      this.continueGame()
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      cancelAnimationFrame(this.gameLoop)
    }
  }

  start() {
    if (this.gameStarted) {
      return;
    }
    this.gameStarted = true;
    this.gameOn = true;
    this.constructBrickArray();
    this.score = 0;
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}



module.exports = Game;
