const Brick = require('./Brick.js');
const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js')
const style = require('./style.css');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var brickCount = 1;
var bricks = []

var ball = new Ball(canvas.width / 2, canvas.height - 40, 5);
ball.draw(context);

var paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);

paddle.draw(context);


for (var i = 0; i <  brickCount; i++) {
  bricks.push(new Brick(20 * i, 20, 10, 10))
}
