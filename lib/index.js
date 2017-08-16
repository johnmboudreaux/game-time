const Brick = require('./Brick.js');
const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js')
const style = require('./style.css');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var bricks = []


var ball = new Ball(canvas.width / 2, canvas.height - 40, 5);
ball.draw(context);

var paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);
var velocityX = 1;
var velocityY = 1;

window.addEventListener('keydown', function(e) {
  e.preventDefault();
  paddle.move(e.keyCode)
  console.log(e.keyCode);
})

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw(context);
    requestAnimationFrame(gameLoop);
    ball.draw(context);
    ball.move(velocityX, velocityY);

    if (ball.y > 800) {
        velocityY = -1;
    }
    if (ball.y < 0) {
        velocityY = 1;
    }

    if (ball.x > 1000) {
        velocityX = -1;
    }
    if (ball.x < 0 ) {
        velocityX = 1;
    }

    for (var i = 0; i < bricks.length; i++) {
        bricks[i].draw(context);
        var brick = bricks[i];
        if (
            ball.x > brick.x &&
            ball.x < brick.x + brick.width &&
            ball.y > brick.y &&
            ball.y < brick.y + brick.height
        ) {
            bricks.splice(i, 1)
            velocityX = -1;
            velocityY = -1;
        }
    }

}



for (var row = 0; row < 3; row++) {

    for (var column = 0; column < 10; column++) {
        bricks.push(new Brick(25 + (100 * column), 25 + (30 * row), 50, 15));
    }

}


requestAnimationFrame(gameLoop);
