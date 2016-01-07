const React = require("react");
const ReactDOM = require("react-dom");

require("./sass/style.scss");

var game; 
var context;
var distance;
var elapsed = 0.01;
var user = {
	speed: 800,
	posY: NaN,
	posX: NaN,
	sizeY: 20,
	sizeX: 20,
	directionY: NaN,
	directionX: NaN,
	checkPosX: NaN,
	checkPosY: NaN,
	moving: false
};

var obstacle = {
	posY: 400,
	posX: 400,
	sizeY: 20,
	sizeX: 20
};

var projectile	 = {
	posY: 20,
	posX: 20,
	sizeY: 10,
	sizeX: 10,
	shot: false,
	bullet: true,
	speed: user.speed * 3
};

var mouseClick = {
	y: NaN,
	x: NaN
};

var App = React.createClass({

	initialState: function(){
		init();
	},
	
	
	
	
	render: function() {
		return (
			<canvas id="myCanvas"></canvas>
		);
	}
});


function render(){
	var doc = document.getElementById("app")
	ReactDOM.render(<App />, doc);
}


render();







function init(){
	game = document.getElementById("game");
	context = game.getContext("2d");
	context.canvas.height = window.innerHeight;
	context.canvas.width = window.innerWidth;
	user.posY = context.canvas.height / 2;
	user.posX = context.canvas.width / 2;
	gameLoop();
}

function drawUser(){
	context.beginPath();
	context.arc(user.posX, user.posY, user.sizeX, 0, 2*Math.PI);
	context.fillStyle = "#c31b48";
	context.fill();
}


function update(){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	if(user.moving === true){
		user.posX += user.directionX * user.speed * elapsed;
		user.posY += user.directionY * user.speed * elapsed;
		if(user.posX >= mouseClick.x -5 && user.posX <= mouseClick.x + 5 && user.posY >= mouseClick.y -5 && user.posY <= mouseClick.y + 5){
			user.moving = false;
		}		
	}
	drawUser();
}

function gameLoop(timestamp) {
	requestAnimationFrame(gameLoop);
	update();
}



document.addEventListener("click", function(event){
	mouseClick.y = event.y;
	mouseClick.x = event.x;
	distance = Math.sqrt(Math.pow(mouseClick.x - user.posX, 2) + Math.pow(mouseClick.y - user.posY,2));
	user.directionX = (mouseClick.x - user.posX) / distance;
	user.directionY = (mouseClick.y - user.posY) / distance;
	user.moving = true
});
