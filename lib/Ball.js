class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = 5;
    this.velocityY = -5;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
  }

  move() {
    this.x = this.x + (this.velocityX);
    this.y = this.y + (this.velocityY);
  }

  wallCollision(canvas, game) {
    if (this.y >= canvas.height - this.radius) {
      game.gameOn = false;
      game.lives--;
    }
    if (this.y <= 0 + this.radius) {
      this.velocityY = -this.velocityY;
    }
    if (this.x >= canvas.width - this.radius) {
      this.velocityX = -this.velocityX;
    }
    if (this.x <= 0 + this.radius) {
      this.velocityX = -this.velocityX;
    }
  }

  registerCollisions() {
    this.wallCollision()
    this.paddleCollision()
  }

  paddleCollision(paddle) {
    let ballY = this.y + this.radius;
    let ballX = this.x + this.radius;

    if (

      ((ballY > paddle.y) && (ballY < paddle.bottomEdge())) &&
      ((ballX > paddle.leftEdge()) && (ballX < paddle.rightEdge()))
    ) {
      this.velocityY = -this.velocityY;

      if (ballX < paddle.middlePoint() - 20) {
        this.velocityX = -5;
      } else if (ballX < paddle.middlePoint() - 15) {
        this.velocityX = -4;
      } else if (ballX < paddle.middlePoint() - 10) {
        this.velocityX = -3;
      } else if (ballX < paddle.middlePoint() - 5) {
        this.velocityX = - 2;
      } else if (ballX < paddle.middlePoint()) {
        this.velocityX = -1;
      } else if (ballX >= paddle.middlePoint() + 20) {
        this.velocityX = 5;
      } else if (ballX >= paddle.middlePoint() + 15) {
        this.velocityX = 4;
      } else if (ballX >= paddle.middlePoint() + 10) {
        this.velocityX = 3;
      } else if (ballX >= paddle.middlePoint() + 5) {
        this.velocityX = 2;
      } else {
        this.velocityX = 1;
      }
    }
  }

  brickCollision(brick) {
    if (
      ((this.y > brick.y) && (this.y < brick.bottomEdge())) &&
      ((this.x > brick.leftEdge()) && (this.x < brick.rightEdge()))
    ) {
      if (this.x === brick.leftEdge() || this.x === brick.rightEdge()) {
        this.velocityX = -this.velocityX;
      }
      this.velocityY = -this.velocityY;
      return true;
    }
  }
}


module.exports = Ball;
