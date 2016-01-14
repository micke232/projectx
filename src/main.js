var game;
var context;

const React = require("react");
const ReactDOM = require("react-dom");

require("./sass/style.scss");

window.user = {
	speed: 800,
	posY: 350,
	posX: 950,
	sizeY: 20,
	sizeX: 20,
	directionY: NaN,
	directionX: NaN,
	checkPosX: NaN,
	checkPosY: NaN,
	moving: false
}

window.mouseClick = {
	y: NaN,
	x: NaN
}

window.distance;
window.elapsed = 0.01;

var App = React.createClass({

	init: function() {
		game = document.getElementById("myCanvas");
		context = game.getContext("2d");
		context.canvas.height = 720;
		context.canvas.width = 1280;

		/* Background image function */
		var background = new Image();
		background.src = "src/graphics/background1.jpg";
		background.onload = function(){
			context.drawImage(background,0,0);
		}
	},
	update: function(){

		/* clearRect skriver över bakgrundsbilden */
		//context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		if(user.moving === true){
			user.posX += user.directionX * user.speed * elapsed;
			user.posY += user.directionY * user.speed * elapsed;
			if(user.posX >= mouseClick.x -5 && user.posX <= mouseClick.x + 5 && user.posY >= mouseClick.y -5 && user.posY <= mouseClick.y + 5){
				user.moving = false;
			};		
		};
		this.drawUser();
		this.drawWalls();
	},
	drawUser: function(){
		context.beginPath();
		context.arc(user.posX, user.posY, user.sizeX, 0, 2*Math.PI);
		context.fillStyle = "#c31b48";
		context.fill();
	},
	drawWalls: function(){
		/* Walls */

		/* Room 1 Top Left */
		context.beginPath();
		context.moveTo(500,100); //(Top-pos,length)
		context.lineTo(500,0);	//(Bottom-pos, margin-top)
		context.lineWidth = 15;
		context.strokeStyle = '#fff';
		context.stroke();

		context.beginPath();
		context.moveTo(500,300);
		context.lineTo(500,200);
		context.stroke();

		context.beginPath();
		context.moveTo(507,300);
		context.lineTo(0,300);
		context.stroke();

		/* Room 2 Top Right */
		context.beginPath();
		context.moveTo(800,300);
		context.lineTo(1100,300);
		context.stroke();

		context.beginPath();
		context.moveTo(1200,300);
		context.lineTo(1280,300);
		context.stroke();

		context.beginPath();
		context.moveTo(807,307);
		context.lineTo(807,0);
		context.stroke();

		/* Room 3 Bottom Left */
		context.beginPath();
		context.moveTo(0,450);
		context.lineTo(400,450);
		context.stroke();

		context.beginPath();
		context.moveTo(500,442);
		context.lineTo(500,768);
		context.stroke();

		/* Room 4 Bottom Right */
		context.beginPath();
		context.moveTo(800,450);
		context.lineTo(1280,450);
		context.stroke();

		context.beginPath();
		context.moveTo(807,442);
		context.lineTo(807,608);
		context.stroke();

		context.beginPath();
		context.moveTo(807, 698);
		context.lineTo(807, 768);
		context.stroke();
	},
	handleMouseClick: function(event){
		mouseClick.y = event.nativeEvent.clientY;
		mouseClick.x = event.nativeEvent.clientX;
			distance = Math.sqrt(Math.pow(mouseClick.x - user.posX, 2) + Math.pow(mouseClick.y - user.posY,2));
			user.directionX = (mouseClick.x - user.posX) / distance;
			user.directionY = (mouseClick.y - user.posY) / distance;
			user.moving = true
	},
	componentDidMount: function() {
		this.init();
		setInterval(this.update, this.props.interval);
	},
	render: function() {
		return (
			<canvas id="myCanvas" onClick={this.handleMouseClick}></canvas>
		);
	}
});

ReactDOM.render(<App interval={25}/>, document.getElementById('app')
);

