var context = canvas.getContext('2d');

class Ball {
  constructor (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
  }
}





module.exports = Ball;
