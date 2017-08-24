class Ball {
  constructor(x, y, radius = 10, velocityX = 0, velocityY = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }

  move() {
    this.x = this.x + (this.velocityX);
    this.y = this.y + (this.velocityY);
  }

  registerCollisions(canvas, game) {
    this.wallCollision(canvas, game)
    this.paddleCollision(game.paddle)
  }

  wallCollision(canvas, game) {
    if (this.y >= canvas.height - this.radius && game.lives > 0) {
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
        this.velocityX = -2;
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

  leftEdge() {
    return this.x - this.radius;
  }

  rightEdge() {
    return this.x + this.radius;
  }

  topEdge() {
    return this.y + this.radius;
  }

  bottomEdge() {
    return this.y - this.radius;
  }

  brickCollision(brick) {
    let hitY = false;
    let hitX = false;

    if (this.topEdge() > brick.y && this.topEdge() < brick.bottomEdge()) {
      hitY = true;
    }

    if (this.bottomEdge() > brick.y && this.bottomEdge() < brick.bottomEdge()) {
      hitY = true;
    }

    if (this.rightEdge() > brick.leftEdge() && this.rightEdge() < brick.rightEdge()) {
      hitX = true;
    }

    if (this.leftEdge() > brick.leftEdge() && this.leftEdge() < brick.rightEdge()) {
      hitX = true;
    }

    if (hitX && hitY) {
      if (this.rightEdge() === brick.leftEdge() || this.leftEdge() === brick.rightEdge()) {
        this.velocityX = -this.velocityX;
      }

      this.velocityY = -this.velocityY;

      return true;
    }
  }


}


module.exports = Ball;
