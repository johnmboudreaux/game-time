// Block.js
class Block {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  move(velocity) {
    this.x += velocity * .2;
    this.y += velocity * 1.2;
  }
}


module.exports = Block;
