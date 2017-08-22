var {assert, expect, should} = require('chai');
var Ball = require('../lib/Ball.js');


describe('ball testing', () => {
  it('should be a function', () => {
    var ball = new Ball();

  })

  it.skip('should have an x coordinate', () => {

    var ball = new Ball()

    assert.equal(ball.x = canvas.width / 2);
  })

  it.skip('should have an y coordinate', () => {
    var ball = new Ball();

    assert.equal(ball.y, 200);
  })

  it('should have a radius', () => {
    var ball = new Ball();

    assert.equal(ball.radius, 10)
  })

  it('should have a velocityX of 5', () => {
    var ball = new Ball();

    assert.equal(ball.velocityX, 5);
  })

  it('should have a velocityY of -5', () => {
    var ball = new Ball();

    assert.equal(ball.velocityY, -5);
  })

  it.skip('should move along the x and y axis', () => {
    var ball = new Ball();
  })

  it.skip('should detect collision with paddle', () => {
    var ball = new Ball()
    var paddle = new Paddle()




  })




})
