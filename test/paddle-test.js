const { assert } = require('chai');

const Paddle = require('../lib/Paddle.js');

describe('paddle testing', () => {
  const paddle = new Paddle(10, 10, 30);

  it('should be an instance of Paddle', () => {
    assert.equal(paddle instanceof (Paddle), true);
  });

  it('should have x coordinate', () => {
    assert.equal(paddle.x, 10);
  });

  it('should have y coordinate', () => {
    assert.equal(paddle.y, 10);
  });

  it('should have a width', () => {
    assert.equal(paddle.width, 30);
  });

  it('should have a height', () => {
    assert.equal(paddle.height, 15)
  });

  it('should have a draw function', () => {
    assert.isFunction(paddle.draw);
  });

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
});
