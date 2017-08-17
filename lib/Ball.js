class Ball {
  constructor (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = 5;
    this.velocityY = 5;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
  }

  move() {
    this.x = this.x + (this.velocityX)
    this.y = this.y + (this.velocityY)
  }

  wallCollision(canvas) {
    if (this.y >= canvas.height - this.radius) {
        this.velocityY = -this.velocityY;
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
    if(
      ((this.y > paddle.y) && (this.y < paddle.bottomEdge())) &&
      ((this.x > paddle.leftEdge()) && (this.x < paddle.rightEdge()))
    ) {
      this.velocityY = -this.velocityY;
    }
  }
}





module.exports = Ball;
