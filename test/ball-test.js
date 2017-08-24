const {assert, expect, should} = require('chai');
const Ball = require('../lib/Ball.js');
const Game = require('../lib/Game.js')


describe('ball testing', () => {
  it('should be a function', () => {
  })

  it('should have an x coordinate', () => {
    let ball = new Ball()

    assert.equal(ball.x);
  })

  it('should have an y coordinate', () => {
    let ball = new Ball();

    assert.equal(ball.y);
  })

  it('should have a radius', () => {
    let ball = new Ball();

    assert.equal(ball.radius, 10)
  })

  it.skip('should have a velocityX of 5', () => {
    let game = new Game();
    console.log(game);
    let ball = new Ball();
    console.log(ball);

    th();
    assert.equal(ball.velocityX, 5);
  })

  it('should have a velocityY of -5', () => {
    let ball = new Ball();
    let game = new Game();

    assert.equal(game.ball.velocityY, -5);
  })

  it('should move along the x axis', () => {
    let ball = new Ball();
    let game = new Game();


    assert.equal(game.ball.velocityX <= 0, true);
    ball.move()
    assert.equal(game.ball.velocityX >= -ball.velocityX, true);
  })

  it('should move along the x and y axis', () => {
    let ball = new Ball();


    assert.equal(ball.velocityX === 0, true);
    assert.equal(ball.velocityY === 0, true);
    ball.move();
    assert.equal(ball.velocityX = -ball.velocityX, true);
    assert.equal(ball.velocityY = -ball.velocityY, true);

  })

  it.skip('should hit and bounce off right wall', () => {
    let ball = new Ball(500);

    assert.equal(ball.velocityX >= -ball.velocityX, true)
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true)
  })

  it.skip('should hit and bounce off left wall', () => {
    let ball = new Ball(10);

    assert.equal(ball.velocityX >= -ball.velocityX, true)
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true)
  })

  it.skip('should hit and bounce off the top wall', () => {
    let ball = new Ball(this.x, 10)

    assert.equal(ball.velocityY <= -ball.velocityY, true)
    ball.move();
    assert.equal(ball.velocityY <= -ball.velocityY, true)
  })

  it.skip('should hit and bounce off the bottom wall', () => {
    let ball = new Ball(this.x, 10)

    assert.equal(ball.velocityX >= -ball.velocityX, true)
    ball.move();
    assert.equal(ball.velocityX >= -ball.velocityX, true)
  })

  it.skip('should detect collision with paddle', () => {
    let ball = new Ball()
    let paddle = new Paddle(40, 40, 20, 10)

    assert.equal(ball.paddleCollision(paddle), true)


  })




})
