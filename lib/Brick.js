class Brick {
  constructor (x, y, width, height, brickCount) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.fillStyle = '#232251'
    context.fillRect(this.x, this.y, this.width, this.height);
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

module.exports = Brick;
