const Brick = require('./Brick.js');
const style = require('./style.css')

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var brickCount = 1;
var bricks = []

context.fillStyle = "rgba(0, 255, 0, 1)";

canvas.addEventListener('click', function (e) {
  console.log('works');
  let x = event.clientX;
  console.log(x);
  let y = event.clientY;
  console.log(y);
  let newbrick = new Brick(x, y, 10, 10);
  bricks.push(newbrick)
  console.log('hello');


});




for (var i = 0; i <  brickCount; i++) {
  bricks.push(new Brick(20 * i, 20, 10, 10))
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < bricks.length ; i++) {
      bricks[i].move(1);
      bricks[i].draw(context);
  }
    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
