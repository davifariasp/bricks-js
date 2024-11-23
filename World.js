class World {

    constructor(canvas, canvasContext){
        this.canvas = canvas;
        this.canvasContext = canvasContext;

		//configurando p game loop
		this.lag = 0;
		this.lastFrameTimeMs = 0;
		this.maxFPS = 60;
		this.timeStep = 1000/this.maxFPS;

		//configurando elementos do game
        this.bricks = new Bricks();
		this.paddle = new Paddle(340,120,20,40);
		this.ball = new Ball(this.paddle, this.bricks);
        

		//configurando acontecimentos
		this.achievementSystem = new Achievements();
		this.ball.addObserver(this.achievementSystem);

		//configurando entidades
		this.entities = [this.paddle, this.ball];
    }

	iniciar(){
		//console.log('entrou no world');
		requestAnimationFrame((t) => this.mainLoop(t));
		canvas.addEventListener('mousemove',MouseInput.calculateMousePos);
	}

	//gameLoop
	mainLoop(timeStamp) {
		// max FPS control
		if(timeStamp < this.lastFrameTimeMs + this.timeStep) {
			//console.log('entrou..')
			requestAnimationFrame((t) => this.mainLoop(t));
			return;
		}
		
		//pattern game loop
		this.lag += timeStamp - this.lastFrameTimeMs;
		this.lastFrameTimeMs = timeStamp;

		//pattern update
		while (this.lag >= this.timeStep) {
			//console.log('esta movendo')
			this.move(this.timeStep);
			this.lag -= this.timeStep;
		}

		this.draw();
		//console.log('entrou...')
		requestAnimationFrame((t) => this.mainLoop(t));
	}

	//mover
    move(deltaTime) {
		for (var i = 0; i < this.entities.length; i++)
			this.entities[i].move(deltaTime);
	}
	
	//desenhar
	draw() {
        var tempoMax = 120;
        var tempo = tempoMax - Math.floor(this.lastFrameTimeMs/1000);
		//background
		colorRect(0,0,this.canvas.width, this.canvas.height, 'black');
        //bricks
        this.bricks.draw();
        //placar
        colorText(`Tempo:${tempo}`, 10, 500, 'white')

        
		for (var i = 0; i < this.entities.length; i++)
			this.entities[i].draw();
        
        //verifica se todos os elementos do meu vetor bricks estao falso
        var acabou = this.bricks.brickGrid.every((e) => e === false);

        if (acabou){
            this.drawResultado('VENCEU')
        }

        if(tempo <= 0){
            this.drawResultado('PERDEU')
        }
	}

    drawResultado(r){
        switch (r) {
            case 'VENCEU':
                colorRect(0,0,this.canvas.width, this.canvas.height, 'black');
                colorText('VOCÊ VENCEU', this.canvas.width/2 - 120,this.canvas.height/2,'white');
                break;
            
            case 'PERDEU':
                colorRect(0,0,this.canvas.width, this.canvas.height, 'black');
                colorText('VOCÊ PERDEU', this.canvas.width/2 - 120,this.canvas.height/2,'white');
            break;

            default:
                break;
        }
    }
}