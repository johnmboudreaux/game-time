var context = canvas.getContext('2d');


class Paddle {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
 }

  draw() {
   context.beginPath();
   context.fillRect(40, 40, 50, 10);
   context.fillStyle = 'red'
   context.closePath();
 }
}

var paddle = new Paddle;
paddle.draw();

module.exports = Paddle;
