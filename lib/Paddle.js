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
    context.fillStyle = 'red'
    context.closePath();
  }

  move(key) {
    if (key === 39) {
      this.x += 50;
    }
    if (key === 37) {
      this.x -= 50
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
}

module.exports = Paddle;
