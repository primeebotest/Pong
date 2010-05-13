
function Ball(args){
	this.m_pos;
}

function Paddle(args){
	this.m_x;
}

function Pong(args){
	this.m_ball = new Ball();
	this.m_bottomPad = new Paddle();
	this.m_canvas = args.canvas;
	
	this.run = function(){ }
	this.stop = function(){ }
}

function contentLoaded() {
	var myPongArgs = {canvas:document.getElementById("pong")};
	var myPongGame = new Pong(myPongArgs);
	myPongGame.run();
	if(typeof onContentLoaded == 'undefined'){ return; }
	onContentLoaded();
}