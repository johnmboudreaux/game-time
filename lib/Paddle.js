const GameBlock = require('../lib/GameBlock.js')

class Paddle extends GameBlock {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  draw(context) {
    context.beginPath();
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = '#e0e0e0';
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
