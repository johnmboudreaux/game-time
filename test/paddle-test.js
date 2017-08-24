var {assert, expect, should} = require('chai');

var Paddle = require('../lib/Paddle.js');
var Ball = require('../lib/Ball.js');

describe('paddle testing', function() {
  it('should be a function', () => {
    // var paddle = new Paddle();

    assert.isFunction(Paddle);

  })

  it('should have x coordinate', () => {
    var paddle = new Paddle('x');

    assert.equal(paddle.x, 'x');
  })

  it('should have y coordinate', () => {
    var paddle = new Paddle('x', 'y');

    assert.equal(paddle.y, 'y');
    assert.isDefined(paddle.y);
  })


  it.skip('should have a width', () => {
    var paddle = new Paddle();


  })

  it.skip('should have a height', () => {
    var paddle = new Paddle();


  })

  it.skip('should collide with ball', () => {
    var paddle = new Paddle();
    var ball = new Ball();


  })

})
