const Block = require('./Block.js');
const style = require('./style.css')


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var block1 = new Block(50, 50, 10, 10);
var block2 = new Block(70, 100, 10, 10);
var block3 = new Block(150, 150, 10, 10);
var block4 = new Block(200, 200, 10, 10);

var blockCount = 45;
var blocks = []

context.fillStyle = "rgba(0, 255, 0, 1)";

canvas.addEventListener('click', function (e) {
  console.log('works');
  let x = event.clientX;
  console.log(x);
  let y = event.clientY;
  let newBlock = new Block(x, y, 10, 10)
  console.log(event);
  blocks.push(newBlock)

});




for (var i = 0; i <  blockCount; i++) {
  blocks.push(new Block(20 * i, 20, 10, 10))
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < blocks.length ; i++) {
      blocks[i].move(1);
      blocks[i].draw(context);
  }
    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
