class Bricks{
	constructor(){
		//configurações dos bricks
		this.BRICK_WIDTH = 100;
		this.BRICK_HEIGHT = 50;
		this.BRICK_GAP = 5;
		this.BRICK_COLUMNS = 8;
		this.BRICK_ROWS = 3;

		//grid
		this.brickGrid = Array(this.BRICK_COLUMNS*this.BRICK_ROWS).fill(true);
	}

	draw(){
		for (var i=0; i < this.BRICK_COLUMNS; i++) {
			for (var j = 0; j < this.BRICK_ROWS; j++) {
				var arrayIndex = rowColToArrayIndex(i,j, this.BRICK_COLUMNS);
				if(this.brickGrid[arrayIndex])
					colorRect(this.BRICK_WIDTH*i,this.BRICK_HEIGHT*j,this.BRICK_WIDTH-this.BRICK_GAP,
					this.BRICK_HEIGHT-this.BRICK_GAP,'blue');
			}
		}
	}
}