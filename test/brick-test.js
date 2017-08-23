const {assert, expect, should} = require('chai');
const Brick = require('../lib/Brick.js');
const Ball = require('../lib/Ball.js');


describe('brick testing', () => {

  it('should be a function', function() {
    assert.isFunction(Brick)
  })

  it('should instantiate a new Brick', function () {
    var brick = new Brick();

    assert.isObject(brick);
  });

  it('should have an x ', function() {
    var brick = new Brick('x');

    assert.equal(brick.x, 'x');
  })

  it('should have a y ', function() {
    var brick = new Brick('x', 'y');

    assert.equal(brick.x, 'x', 'y');
  })

  it('should have a width', function() {
    var brick = new Brick('x', 'y', 'width');

    assert.equal(brick.x, 'x', 'y', 'width');
  })

  it.skip('should draw itself', function() {
    var brick = new Brick();

    console.log(brick.brickDrawn);
    assert.equal(brick.brickDrawn, false);

    brick.draw(context);
    console.log(brick.brickDrawn);

    assert.equal(brick.brickDrawn, true);
  })

  it('should have a top, right, left and bottom edge', function() {
    var brick = new Brick();

    brick.topEdge();
    brick.rightEdge();
    brick.leftEdge();
    brick.bottomEdge();
  })

})
