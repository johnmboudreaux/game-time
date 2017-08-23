var {assert, expect, should} = require('chai');

var Paddle = require('../lib/Paddle.js');

describe('paddle testing', function() {
  it('should be a function', () => {
    var paddle = new Paddle();

  })

  it.skip('should have x coordinate', () => {
    var paddle = new Paddle();


  })

  it.skip('should have y coordinate', () => {
    var paddle = new Paddle();

  })

  it.skip('should have a width', () => {
    var paddle = new Paddle();

    assert.equal(paddle.width, 40);
  })

  it.skip('should have a height', () => {
    var paddle = new Paddle();

    assert.equal(paddle.height, 15)
  })

})
