// var context = canvas.getContext('2d');

class Paddle {
  constructor (x, y, width, height = 15) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
 }

  draw(context) {
   context.beginPath();
   context.fillRect(this.x, this.y, this.width, this.height);
   context.fillStyle = 'red'
   context.closePath();
 }
}




module.exports = Paddle;
