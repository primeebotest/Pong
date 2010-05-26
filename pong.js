Function.prototype.bind = function(object) {
	var method = this;
	return function() {
		method.apply(object, arguments);
	}
}

function Ball(args){
	this.m_canvas = args.canvas;
	this.m_pos = args.pos;
	this.m_radius = 10;
	this.m_size = this.m_radius*2;
	this.m_dx = this.m_dy = 1;	

	this.getPos = function() { return this.m_pos; }
	this.setPos = function(args) { this.m_pos = args.pos; }
	this.draw = function(){
		if(this.m_canvas.getContext){
			var ctx = this.m_canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(this.m_pos.x, this.m_pos.y, this.m_radius, 0, Math.PI*2, true);
			ctx.stroke();
			ctx.restore();
		}

	}
	
	this.erase = function(){
		var ctx = this.m_canvas.getContext('2d');
		ctx.clearRect(this.m_pos.x-this.m_radius -1, this.m_pos.y-this.m_radius -1, this.m_radius*2 + 2, this.m_radius*2 + 2);
		ctx.save();
	}

	this.bounceLogic = function(){

		this.erase();
		//bouncy
		if(this.m_pos.x + this.m_radius > this.m_canvas.width) { this.m_dx = -1; }
		else if(this.m_pos.x-this.m_radius == 1){ this.m_dx = 1}
		
		if(this.m_pos.y + this.m_radius > this.m_canvas.height) { this.m_dy = -1; }
		else if(this.m_pos.y-this.m_radius == 1){ this.m_dy = 1}

		this.m_pos.x += this.m_dx;
		this.m_pos.y += this.m_dy;
		
		this.draw();
	}

	this.animate = function(){
		setInterval( this.bounceLogic.bind(this) , 1)
	}
}

function Paddle(args){
	this.m_canvas = args.canvas;
	this.m_pos = args.pos;	

	this.getPos = function() { return this.m_pos; }
	this.draw = function(){ }
}

function Pong(args){
	this.m_canvas = args.canvas;
	this.m_pos = args.pos;

	var ballStartPos =  {x: Math.floor(Math.random() * this.m_canvas.width), y: Math.floor(Math.random() * this.m_canvas.height)};
	this.m_ball = new Ball({canvas: this.m_canvas, pos:ballStartPos});
	this.m_paddle = new Paddle({canvas:this.m_canvas});
	
	this.run = function(){ this.m_ball.animate(); }
	this.stop = function(){ }
}

function contentLoaded() {
	var myCanvas = document.getElementById("pong");
	myCanvas.width = myCanvas.height = 400;
	var startPos = {x:0, y:0};
	var myPongArgs = {canvas:myCanvas, pos:startPos};
	var myPongGame = new Pong(myPongArgs);
	myPongGame.run();
	if(typeof onContentLoaded == 'undefined'){ return; }
	onContentLoaded();
}
