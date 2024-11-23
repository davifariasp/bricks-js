class Achievements extends Observer {

	onNotify(ev) {
		switch(ev) {
			case EVENTS.BALL_TOUCHED_BOTTOM:
				console.log("Ball Touched Bottom");
				break;
			default:
				break;
			
		}
		
	}
}