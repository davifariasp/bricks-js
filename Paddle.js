class Paddle {
	constructor (posX, width, height, distFromEdge, 
	color = 'white') {
			this.posX = posX;
			this.width = width;
			this.height = height;
			this.distFromEdge = distFromEdge;
			this.color = color;
	}
	
	draw(deltaTime) {
		colorRect(this.posX - this.width/2,
				  canvas.height - this.height - this.distFromEdge,
				  this.width, this.height, this.color);
	}
	
	move() {
		this.posX = MouseInput.x;
	}
}