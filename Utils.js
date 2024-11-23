const EVENTS = {
	BALL_TOUCHED_BOTTOM: 'ballTouchedBottom',
	PADDLE_TOUCED_WALL: 'paddleTouchedWall'
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height)
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();
}

function colorText(showWords,textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords,textX,textY);
	canvasContext.font = "30px Verdana";
}

function rowColToArrayIndex(col,row, bricks_columns) {
	return col + bricks_columns*row;
}