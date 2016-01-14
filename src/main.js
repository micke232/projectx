"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
require("./sass/style.scss");


var game;
var context;

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
	moving: false,
	inRoom: false
};

window.mouseClick = {
	y: NaN,
	x: NaN
};

var distance;
var elapsed = 0.01;
var background = new Image();

function wallHandler(){
	const rooms = {
		topLeft: {},
		topRight: {},
		bottomLeft: {},
		bottomRight: {}
	};
}
window.onload = function() {
	SC.initialize({
		client_id: '048fd098861b5d45aabb3862e9e81832'
	})
}

function playMusic(genre) {
	console.log(genre);
	SC.get('/tracks',
				 {genres: genre},
				 function(tracks){
		console.log(tracks);
		var random = Math.floor(Math.random() * tracks.length);
		SC.oEmbed(tracks[random].uri, {auto_play: true}, document.getElementById('soundResult'));
	});
}

var App = React.createClass({

	getInitialState: function() {
		return {
			room: "notInRoom"
		};
	},

	stateHandler: function(inRoom){
		this.setState({room: inRoom})
	},

	init: function() {
		game = document.getElementById("myCanvas");
		context = game.getContext("2d");
		context.canvas.height = 720;
		context.canvas.width = 1280;

		/* Background image function */
		background.src = "src/graphics/background1.jpg";

	},

	update: function(){
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.drawImage(background,0,0);
		
		if(user.moving === true){
			user.posX += user.directionX * user.speed * elapsed;
			user.posY += user.directionY * user.speed * elapsed;
			this.collision();
			if(user.posX >= mouseClick.x -5 && user.posX <= mouseClick.x + 5 && user.posY >= mouseClick.y -5 && user.posY <= mouseClick.y + 5){
				user.moving = false;
			}
		}
		this.drawUser();
		this.drawWalls();
	},

	collision: function(){

		if ((user.posX <= 300) && (user.posY <= 300)){
			this.stateHandler("techo");
			if (user.inRoom === false){
				playMusic('techno');
				user.inRoom = true;
			}
		}
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
		
		var rect = game.getBoundingClientRect();
		mouseClick.y = event.nativeEvent.clientY - rect.top;
		mouseClick.x = event.nativeEvent.clientX - rect.left;
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
			<div>
				<div id="soundResult"></div>
				<canvas id="myCanvas" onClick={this.handleMouseClick} className={this.state.room}></canvas>
			</div>
		);
	}
});

ReactDOM.render(
	<App interval={25}/>, document.getElementById('app')
);
