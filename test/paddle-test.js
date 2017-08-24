const { assert } = require('chai');
const Paddle = require('../lib/Paddle.js');


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
});
