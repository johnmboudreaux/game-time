var context = canvas.getContext('2d');

class Ball {
  constructor (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(context) {
    context.beginPath();
    context.arc(10, 10, 10, 0, Math.PI*2);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
  }
}

var ball = new Ball;
ball.draw(context);

module.exports = Ball;
