const { assert } = require('chai');

const Paddle = require('../lib/Paddle.js');

describe('paddle testing', () => {
  const paddle = new Paddle(10, 10, 30);

  it('should be an instance of Paddle', () => {
    assert.equal(paddle instanceof (Paddle), true)
  })

  it('should have x coordinate', () => {
    assert.equal(paddle.x, 10)
  })

  it('should have y coordinate', () => {
    assert.equal(paddle.y, 10)
  })

  it('should have a width', () => {
    assert.equal(paddle.width, 30);
  })

  it('should have a height', () => {
    assert.equal(paddle.height, 15)
  })

})
