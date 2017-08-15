const Brick = require('./Brick.js');
const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js')
const style = require('./style.css');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var brickCount = 1;
var bricks = []

var ball = new Ball;
ball.draw(context);

canvas.addEventListener('click', function (e) {
  let x = event.clientX;
  let y = event.clientY;
  let newbrick = new Brick(x, y, 10, 10);
  bricks.push(newbrick)
});



for (var i = 0; i <  brickCount; i++) {
  bricks.push(new Brick(20 * i, 20, 10, 10))
}
