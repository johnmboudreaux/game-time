const {
  assert
} = require('chai');
const Paddle = require('../lib/Paddle.js');

// Fix tests for Paddle :)
describe('paddle testing', () => {

  it('should not move off the right side of the canvas', () => {
    const paddle = new Paddle(570, 20, 30);

    paddle.rightEdge({ width: 600 }, 1, true);
    assert.equal(paddle.x, 570);
  });

  it('should not move off the left side of the canvas', () => {
    const paddle = new Paddle(5, 20, 30);

    paddle.leftEdge({ width: 600 }, -1, true);
    assert.equal(paddle.x, 5);
  });

  assert.isFunction(Paddle);

  it('should be an instance of Paddle', () => {
    assert.equal(this.paddle instanceof(Paddle), true);
  });

  it('should have x coordinate', () => {
    var paddle = new Paddle('x');
    assert.equal(this.paddle.x, 'x');
  })

  it('should have y coordinate', () => {
    assert.equal(this.paddle.y, 10);
  });

  it('should have a height', () => {
    assert.equal(this.paddle.height, 15)
  });

  it('should have a width', () => {
    assert.equal(this.paddle.width, 30);
  });

  it('should have y coordinate', () => {
    var paddle = new Paddle('x', 'y');

    assert.equal(this.paddle.y, 'y');
    assert.isDefined(this.paddle.y);
  })

  it('should have a draw function', () => {
    assert.isFunction(this.paddle.draw);
  });



  it('should not move off the right side of the canvas', () => {
    const paddle = new Paddle(570, 20, 30);

    paddle.rightEdge({
      width: 600
    }, 1, true);
    assert.equal(paddle.x, 570);
  });


  it.skip('should collide with ball', () => {
    var paddle = new Paddle();
    var ball = new Ball();

  })

  it('should not move off the left side of the canvas', () => {
    const paddle = new Paddle(5, 20, 30);

    paddle.leftEdge({
      width: 600
    }, -1, true);
    assert.equal(paddle.x, 5);
  });
})

