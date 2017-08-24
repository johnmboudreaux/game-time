const { assert } = require('chai');
const Brick = require('../lib/Brick.js');



describe('brick testing', () => {
  let brick = new Brick();

  it('should instantiate a new Brick', () => {
    assert.isObject(brick);
  });

  it('should be a function', () => {
    assert.isFunction(Brick);
  });

  it('should have an x', () => {
    let brick = new Brick('x', 'y');

    assert.equal(brick.x, 'x');
  });

  it('should have a y', () => {
    let brick = new Brick('x', 'y');

    assert.equal(brick.x, 'x', 'y');
  });

  it('should have a width', () => {
    let brick = new Brick('x', 'y', 'width');

    assert.equal(brick.x, 'x', 'y', 'width');
  });

  it('should have a top, right, left and bottom edge', () => {
    let brick = new Brick();

    brick.topEdge();
    brick.rightEdge();
    brick.leftEdge();
    brick.bottomEdge();
  });
});
