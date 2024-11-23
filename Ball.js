class Ball extends Subject {
	constructor (paddle, bricks, posX = 200, posY = 200, speedX = 0.2, speedY = 0.2,
				radius = 10, bounceEffect = 0.01, color = 'yellow') {
					
		super();
		this.posX = posX;
		this.posY = posY;
		this.speedX = speedX;
		this.speedY = speedY;
		this.radius = radius;
		this.bounceEffect = bounceEffect;
		this.color = color;
		this.paddle = paddle;
		this.bricks = bricks;
	}
	
	draw() {
		colorCircle(this.posX,this.posY,this.radius,this.color);
	}
	
	move(deltaTime) {
		//console.log(this.posY);
		this.posX += this.speedX*deltaTime;
		this.posY += this.speedY*deltaTime;
		
		//collision ball - walls
		if(this.posX <= 0) //left wall
			this.speedX = -this.speedX;
		if(this.posX >= canvas.width) //right wall
			this.speedX = -this.speedX;
		if(this.posY <= 0) {//top wall
			this.speedY = -this.speedY;
		}
		if(this.posY >= canvas.height) { //bottom wall
			//Achievements.ballTouchedBottom();
			super.notify(EVENTS.BALL_TOUCHED_BOTTOM);
			this.posX = 200;
			this.posY = 200;
		}
		
		this.paddleCollision();
		this.brickCollision();
	}
	
	paddleCollision() {
		var paddleLeftEdgeX = this.paddle.posX - this.paddle.width/2; 
		var paddleRightEdgeX = paddleLeftEdgeX + this.paddle.width;
		var paddleTopEdgeY = canvas.height - this.paddle.height - this.paddle.distFromEdge;
		var paddleBottomEdgeY = paddleTopEdgeY + this.paddle.height;
		
		if (this.posY > paddleTopEdgeY &&
			this.posY < paddleBottomEdgeY &&
			this.posX > paddleLeftEdgeX &&
			this.posX < paddleRightEdgeX) {
			
			var centerXpaddle = this.paddle.posX;
			var distFromCenter = this.posX - centerXpaddle;
			
			this.speedX = distFromCenter*(this.bounceEffect);		
			this.speedY *= -1;
		}
	}

	brickCollision(){
		//colisao no brick
		var brickBallX = Math.floor(this.posX/this.bricks.BRICK_WIDTH);
		var brickBallY = Math.floor(this.posY/this.bricks.BRICK_HEIGHT);
		var brickUnderBall = rowColToArrayIndex(brickBallX, brickBallY, this.bricks.BRICK_COLUMNS)

		if(brickBallY < this.bricks.BRICK_ROWS) {
			if (this.bricks.brickGrid[brickUnderBall] == true){
				this.bricks.brickGrid[brickUnderBall] = false;
				this.speedY *= -1;
			}
			//this.bricks.brickGrid[brickUnderBall] = false;
		}
			
	}
}
