const {assert, expect, should} = require('chai');
const Ball = require('../lib/Ball.js');
const Game = require('../lib/Game.js')
const Paddle = require('../lib/Paddle.js')


describe('ball testing', () => {
  it('should be a function', () => {
    let ball = new Ball()
  })

  it('should have an x coordinate', () => {
    let ball = new Ball()

    assert.equal(ball.x);
  })

  it('should have an y coordinate', () => {
    let ball = new Ball();

    assert.equal(ball.y);
  })

  it('should not have a speed before start', () => {
    let ball = new Ball();

    assert.equal(ball.velocityX === 0, true);
    assert.equal(ball.velocityY === 0, true)
  })

  it('should have a radius', () => {
    let ball = new Ball();

    assert.equal(ball.radius, 10)
  })

  it.skip('should have a velocityX of 5', () => {
    let game = new Game();
    let ball = new Ball();

    assert.equal(ball.velocityX, 5);
  })

  it.skip('should have a velocityY of -5', () => {
    let ball = new Ball();
    let game = new Game();

    assert.equal(game.ball.velocityY, -5);
  })

  it.skip('should move along the x axis', () => {
    let ball = new Ball();


    assert.equal(game.ball.velocityX <= 0, true);
    ball.move()
    assert.equal(game.ball.velocityX >= -ball.velocityX, true);
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
    let ball = new Ball(this.x, 10)

    assert.equal(ball.velocityY <= -ball.velocityY, true)
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true)
  })

  it('should hit and bounce off the bottom wall', () => {
    let ball = new Ball(this.x, 10)

    assert.equal(ball.velocityX >= -ball.velocityX, true)
    ball.move();
    assert.equal(ball.velocityX >= -ball.velocityX, true)
  })

  it.skip('should detect collision with paddle', () => {
    let ball = new Ball()
    let paddle = new Paddle(40, 40, 20, 10)

    ball.x = 50;
    ball.y = 50;
    ball.velocityY = 5;

    assert.deepEqual(ball.paddleCollision(paddle), true)

    // expect(ball.collision(canvas, paddle)).to.deep.equal({ collision: true,
    //  x: false,
    //  y: true });
  });


})
