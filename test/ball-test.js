const { assert } = require('chai');
const Ball = require('../lib/Ball.js');



describe('ball testing', () => {
  const ball = new Ball(10, 100, 10, 5, -5);

  it('should be an instance of Ball', () => {
    assert.equal(ball instanceof Ball, true);
  });

  it('should have an x coordinate', () => {
    assert.equal(ball.x, 10);
  });

  it('should have an y coordinate', () => {
    assert.equal(ball.y, 100);
  });

  it('should have a radius', () => {
    assert.equal(ball.radius, 10);
  });

  it('should have a velocityX of 5', () => {
    assert.equal(ball.velocityX, 5);
  });

  it('should have a velocityY of -5', () => {
    assert.equal(ball.velocityY, -5);
  });

  it('should move along the x and y axis', () => {
    let ball = new Ball();

    assert.equal(ball.velocityX === 0, true);
    assert.equal(ball.velocityY === 0, true);
    ball.move()
    assert.equal(ball.velocityX > 0, false);
    assert.equal(ball.velocityY > 0, false);
  });

  it('should hit and bounce off right wall', () => {
    assert.equal(ball.velocityX >= -ball.velocityX, true);
    ball.move()
    assert.equal(ball.velocityY <= -ball.velocityY, true);
  });

  it('should hit and bounce off left wall', () => {
    assert.equal(ball.velocityX >= -ball.velocityX, true);
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true);
  });

  it('should hit and bounce off the top wall', () => {
    assert.equal(ball.velocityY <= -ball.velocityY, true);
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true);
  });

  it('should hit and bounce off the bottom wall', () => {
    assert.equal(ball.velocityX >= -ball.velocityX, true);
    ball.move();
    assert.equal(ball.velocityX >= -ball.velocityX, true);
  });

  it('should have a move function', () => {
    assert.isFunction(ball.move);
  });

  it('should have a move function', () => {
    assert.isFunction(ball.move);
  });

  it('should have a paddle collision function', () => {
    assert.isFunction(ball.paddleCollision);
  })

  it('should have a wall collision function', () => {
    assert.isFunction(ball.wallCollision);
  });

  it('should have a brick collision function', () => {
    assert.isFunction(ball.brickCollision);
  })

});
