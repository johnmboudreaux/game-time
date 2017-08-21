/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	const gameStart = document.querySelector('.game-start');

	const Game = __webpack_require__(1);
	const game = new Game(context, canvas);

	const Brick = __webpack_require__(4);

	const bricks = [];

	window.addEventListener('keydown', eventHandler);
	document.addEventListener("mousemove", mouseMoveHandler, false);

	function eventHandler(e) {
	  e.preventDefault();
	  game.paddle.move(e.keyCode, canvas);
	  game.pause(e.keyCode);
	}

	function mouseMoveHandler(e) {
	  let relativeX = e.clientX - canvas.offsetLeft;

	  if (relativeX > 0 && relativeX < canvas.width) {
	    game.paddle.x = relativeX - game.paddle.width / 2;
	  }
	}

	function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);

	  if (game.gameOn) {
	    game.drawAll(canvas, context);
	    bricks.forEach(brick => brick.draw(context));

	    game.ball.registerCollisions(canvas, game);
	    game.ball.move();

	    // removeBricksIfNeeded///
	    for (let i = 0; i < bricks.length; i++) {
	      let brick = bricks[i];

	      if (game.ball.brickCollision(brick)) {
	        bricks.splice(i, 1);
	        game.score++;
	      }
	    }

	    //
	    context.fillText('Score: ' + game.score, 5, 15);
	    context.fillText('Lives: ' + game.lives, 960, 15);
	  } else {
	    game.ball.x = canvas.width / 2;
	    game.ball.y = 200;
	    // canvas.removeEventListener('click', start);


	    // shouldGameContinue()
	    if (game.lives > 0) {
	      context.fillText('Click to continue', 500, 325);
	      canvas.addEventListener('click', function () {
	        game.gameOn = true;
	        // reloop
	      });
	    } else {
	      game.gameOn = false;
	    }
	  }
	  requestAnimationFrame(gameLoop);
	}

	function start() {
	  if (game.gameOn) {
	    return;
	  }
	  game.gameOn = true;
	  // pull out to other function 'populateBoard' --> start/die
	  for (let row = 0; row < 3; row++) {
	    for (let column = 0; column < 10; column++) {
	      bricks.push(new Brick(25 + 100 * column, 25 + 30 * row, 50, 15));
	    }
	  }
	  game.score = 0;
	  game.lives = 4;
	  requestAnimationFrame(gameLoop);
	}

	// context.fillText('Click To Start', 500, 325);
	// canvas.addEventListener('click', start);
	gameStart.addEventListener('click', start);

	// add a button outside of canvas
	// on click: changes text to "restart"
	// act on the button click according to the text on the button

	// after the first click (counter that you set)
	// don't run the start code again

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Ball = __webpack_require__(2);
	const Paddle = __webpack_require__(3);
	// const Brick = require('./Brick.js');

	class Game {
	  constructor(context, canvas) {
	    this.lives = 4;
	    this.score = 0;
	    this.gameOn = false;
	    this.ball = new Ball(canvas.width / 2, canvas.height - 50, 10);
	    this.paddle = new Paddle(canvas.width / 2 - 120 / 2, canvas.height - 30, 120, 15);
	    this.bricks = [];
	  }

	  pause(key) {
	    if (key === 32) {
	      if (this.ball.velocityY === 0) {
	        this.ball.velocityY = -5;
	        this.ball.velocityX = 5;
	      } else {
	        this.ball.velocityY = 0;
	        this.ball.velocityX = 0;
	      }
	    }
	  }

	  drawAll(canvas, context) {
	    this.paddle.draw(context);
	    this.ball.draw(context, canvas);
	  }

	  livesCount() {
	    if (this.lives <= 0) {
	      this.gameOn = false;
	    }
	  }
	}

	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class Ball {
	  constructor(x, y, radius) {
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.velocityX = 5;
	    this.velocityY = -5;
	  }

	  draw(context) {
	    context.beginPath();
	    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	    context.fillStyle = 'blue';
	    context.fill();
	    context.closePath();
	  }

	  move() {
	    this.x = this.x + this.velocityX;
	    this.y = this.y + this.velocityY;
	  }

	  wallCollision(canvas, game) {
	    if (this.y >= canvas.height - this.radius) {
	      game.gameOn = false;
	      game.lives--;
	    }
	    if (this.y <= 0 + this.radius) {
	      this.velocityY = -this.velocityY;
	    }
	    if (this.x >= canvas.width - this.radius) {
	      this.velocityX = -this.velocityX;
	    }
	    if (this.x <= 0 + this.radius) {
	      this.velocityX = -this.velocityX;
	    }
	  }

	  registerCollisions(canvas, game) {
	    this.wallCollision(canvas, game);
	    this.paddleCollision(game.paddle);
	  }

	  paddleCollision(paddle) {
	    let ballY = this.y + this.radius;
	    let ballX = this.x + this.radius;

	    if (ballY > paddle.y && ballY < paddle.bottomEdge() && ballX > paddle.leftEdge() && ballX < paddle.rightEdge()) {
	      this.velocityY = -this.velocityY;

	      if (ballX < paddle.middlePoint() - 20) {
	        this.velocityX = -5;
	      } else if (ballX < paddle.middlePoint() - 15) {
	        this.velocityX = -4;
	      } else if (ballX < paddle.middlePoint() - 10) {
	        this.velocityX = -3;
	      } else if (ballX < paddle.middlePoint() - 5) {
	        this.velocityX = -2;
	      } else if (ballX < paddle.middlePoint()) {
	        this.velocityX = -1;
	      } else if (ballX >= paddle.middlePoint() + 20) {
	        this.velocityX = 5;
	      } else if (ballX >= paddle.middlePoint() + 15) {
	        this.velocityX = 4;
	      } else if (ballX >= paddle.middlePoint() + 10) {
	        this.velocityX = 3;
	      } else if (ballX >= paddle.middlePoint() + 5) {
	        this.velocityX = 2;
	      } else {
	        this.velocityX = 1;
	      }
	    }
	  }

	  brickCollision(brick) {
	    if (this.y > brick.y && this.y < brick.bottomEdge() && this.x > brick.leftEdge() && this.x < brick.rightEdge()) {
	      if (this.x === brick.leftEdge() || this.x === brick.rightEdge()) {
	        this.velocityX = -this.velocityX;
	      }
	      this.velocityY = -this.velocityY;
	      return true;
	    }
	  }
	}

	module.exports = Ball;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class Paddle {
	  constructor(x, y, width, height = 15) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }

	  draw(context) {
	    context.beginPath();
	    context.fillRect(this.x, this.y, this.width, this.height);
	    context.fillStyle = 'red';
	    context.closePath();
	  }

	  move(key, canvas) {
	    if (key == 39) {
	      if (this.x < canvas.width - this.width) {
	        this.x += 20;
	      }
	    }
	    if (key == 37) {
	      if (this.x > 0) {
	        this.x -= 20;
	      }
	    }
	  }

	  rightEdge() {
	    return this.x + this.width;
	  }

	  leftEdge() {
	    return this.x;
	  }

	  bottomEdge() {
	    return this.y + this.height;
	  }

	  middlePoint() {
	    return this.x + this.width / 2;
	  }

	}

	module.exports = Paddle;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	class Brick {
	  constructor(x, y, width, height, brickCount) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.brickCount = brickCount;
	  }

	  draw(context) {
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  rightEdge() {
	    return this.x + this.width;
	  }

	  leftEdge() {
	    return this.x;
	  }

	  bottomEdge() {
	    return this.y + this.height;
	  }

	}

	module.exports = Brick;

/***/ })
/******/ ]);