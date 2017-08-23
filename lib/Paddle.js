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
    context.fillStyle = '#fff';
    context.closePath();

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
