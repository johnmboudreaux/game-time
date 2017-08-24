const GameBlock = require('../lib/GameBlock.js')

class Brick extends GameBlock {
  constructor (x, y, width, height, canvas, context, brickCount) {
    super(x, y, width, height);
    
    this.canvas = canvas;
    this.context = context;
    this.brickCount = brickCount;
    this.brickDrawn = false;
  }

  draw (context) {
    let brickImage = new Image();

    brickImage.src = '../images/brick3.png';
    context.drawImage(brickImage, this.x, this.y, this.width, this.height);
  }

  topEdge() {
    return this.y;
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
