class Paddle {
  constructor (x, y, width, height = 15) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.beginPath();
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'red';
    context.closePath();
  }

  move(direction, canvas) {
    if (direction === 'right')  {
      if (this.x < canvas.width - (this.width - 10)) {
        this.x += 20;
      }
    }
    if (direction === 'left') {
      if (this.x > 0 + 10) {
        this.x -= 20;
      }
    }
  }

  rightEdge() {
    return this.x + this.width;
  }

  leftEdge() {
    return this.x;
  }

  bottomEdge() {
    return this.y + this.height;
  }

  middlePoint() {
    return this.x + (this.width / 2);
  }
}

module.exports = Paddle;
