class Level {
  constructor () {
    this.newLevels = {
      1: {
        rows: 3,
        columns: 8,
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


}

module.exports = Level
