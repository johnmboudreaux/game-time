class Levels {
  constructor () {
    this.newLevelsAttributes = {
      1: {
        rows: 1,
        columns: 1,
        paddleSize: 120,
        ballVY: -5,
        ballVX: 5
      },
      2: {
        rows: 4,
        columns: 6,
        paddleSize: 100,
        ballVY: -5,
        ballVX: 5
      },
      3: {
        rows: 6,
        columns: 8,
        paddleSize: 80,
        ballVY: -10,
        ballVX: 5
      }
    }
  }

  updateLevel(game) {
    console.log('updateLevel function working');
    let level = game.level
    let { rows, columns, paddleSize, ballVY, ballVX } =
    this.newLevelsAttributes[level]

    game.level++;
    game.bricks.rows = rows;
    game.bricks.columns = columns;
    game.paddle.width = paddleSize;
    game.ball.velocityX = ballVY;
    game.ball.velocityY = ballVX;

  }
}

module.exports = Levels;
