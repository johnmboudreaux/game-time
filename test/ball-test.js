const { assert } = require('chai');
const Ball = require('../lib/Ball.js');
const Paddle = require('../lib/Paddle.js')
const Brick = require('../lib/Brick.js')


describe('ball testing', () => {
  const ball = new Ball(10, 100, 10, 5, -5);
  const canvas = { width: 200, height: 200}

  it('should be an instance of Ball', () => {
    assert.equal(ball instanceof Ball, true)
  })

  it('should have an x coordinate', () => {
    assert.equal(ball.x, 10);
  })

  it('should have an y coordinate', () => {
    assert.equal(ball.y, 100);
  })

  it('should have a radius', () => {
    assert.equal(ball.radius, 10)
  })

  it('should have a velocityX of 5', () => {
    assert.equal(ball.velocityX, 5);
  })

  it('should have a velocityY of -5', () => {
    assert.equal(ball.velocityY, -5);
  })

  it.skip('should move along the x axis', () => {
    let ball = new Ball(50, 50, 10);

    assert.equal(ball.velocityX <= 0, true);
    ball.move()
    assert.equal(ball.velocityX >= -ball.velocityX, true);
  })

  it.skip('should move along the x and y axis', () => {
    let ball = new Ball();


    assert.equal(ball.velocityX === 0, true);
    assert.equal(ball.velocityY === 0, true);
    ball.move();
    assert.equal(ball.velocityX !== 0, true);
    assert.equal(ball.velocityY !== 0, true);

  })

  it('should hit and bounce off right wall', () => {
    let ball = new Ball(500);

    assert.equal(ball.velocityX >= -ball.velocityX, true)
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true)
  })

  it('should hit and bounce off left wall', () => {
    let ball = new Ball(10);

    assert.equal(ball.velocityX >= -ball.velocityX, true)
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true)
  })

  it('should hit and bounce off the top wall', () => {

    assert.equal(ball.velocityY <= -ball.velocityY, true)
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true)
  })

  it('should hit and bounce off the bottom wall', () => {

    assert.equal(ball.velocityX >= -ball.velocityX, true)
    ball.move();
    assert.equal(ball.velocityX >= -ball.velocityX, true)
  })

  it('should detect collision', () => {

    let ball = new Ball(5, 15, 5)
    let paddle = new Paddle(40, 40, 20, 10)
    let brick = new Brick(0, 0, 10, 10)

    assert.deepEqual(ball.registerCollisions(paddle, brick), true)

  })
})
