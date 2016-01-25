"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
const classNames = require('classnames');
require("./sass/style.scss");
var musicPlayer;
var game;
var context;
var walls = require("json!./data/data.json");
var triggers = require("json!./data/triggers.json");
var loadImages = require('load-images');

window.user = {
	speed: 250,
	posY: 350,
	posX: 600,
	sizeY: 12.5,
	sizeX: 12.5,
	directionY: NaN,
	directionX: NaN,
	checkPosX: NaN,
	checkPosY: NaN,
	moving: false,
	inRoom: false,
	collision: false,
	playingMusic: false,
  	imageDirection: "still"
};
var userImage = new Image();

loadImages([
		"./src/graphics/left.png",
		"./src/graphics/right.png",
		"./src/graphics/still.png",
		"./src/graphics/room1.png",
		"./src/graphics/room2.png",
		"./src/graphics/room3.png",
		"./src/graphics/room4.png",
		"./src/graphics/notinroom.png"
	], function(err, images){
	console.log(err, images);
	user.images = images;
});

window.mouseClick = {
	y: NaN,
	x: NaN
};

var distance; 
var elapsed = 0.01;
var background = new Image();


window.onload = function(){
	SC.initialize({
		client_id: '048fd098861b5d45aabb3862e9e81832'
	})
};
function loadTrack(trackID){
	SC.stream('/tracks/' + trackID, function(s){
		musicPlayer = s;
		musicPlayer.play();
	});
}

var currentTrack;
var techno = [
	'164932466',
	'187135056',
	'66673724',
	'174690565',
	'110719285',
	'236799491',
	'124388199'
];
var indie = [
	'164932466',
	'187135056',
	'66673724',
	'174690565',
	'110719285',
	'236799491',
	'124388199'
];
var house = [
	'164932466',
	'187135056',
	'66673724',
	'174690565',
	'110719285',
	'236799491',
	'124388199'
];
var pop = [
	'164932466',
	'187135056',
	'66673724',
	'174690565',
	'110719285',
	'236799491',
	'124388199'
];

function loadTrack(trackID){
	if (user.inRoom === true) {
		SC.stream('/tracks/' + trackID, function(track){
			musicPlayer = track;
			musicPlayer.play();
		});
	}
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
		var datsa = this.props.data;
		console.log(datsa.room1);
		for (var index in datsa.room1) {
			console.log(datsa.room1[index]);
		}

		game = document.getElementById("myCanvas");
		context = game.getContext("2d");
		context.canvas.height = 720;
		context.canvas.width = 1280;
	},
  
	update: function(){
		var prevPosX = user.posX;
		var prevPosY = user.posY;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		if (!user.collision){
			if(user.moving === true){
				user.posX += user.directionX * user.speed * elapsed;
				user.posY += user.directionY * user.speed * elapsed;
				this.collision();
				if( user.collision ) { // ooops !
					user.posX = prevPosX;
					user.posY = prevPosY;
				}
				if(user.posX >= mouseClick.x -5 && user.posX <= mouseClick.x + 5 && user.posY >= mouseClick.y -5 && user.posY <= mouseClick.y + 5){
					user.moving = false;
				}
			}
		}
		if ((this.state.room === 'room1' || 'room2' || 'room3' || 'room4') && user.inRoom === true && user.playingMusic === false){
			loadTrack(currentTrack);
			user.playingMusic = true;
		}
		if (this.state.room === 'notInRoom' && user.inRoom === true){
			musicPlayer.pause();
			user.inRoom = false;
			user.playingMusic = false;

		}
		this.drawUser();
	},

	collision: function(){
		for (var i = 0; i < this.props.data.length; i++){
			if (user.posX + 12.5 > this.props.data[i].x1 && user.posX - 12.5 < this.props.data[i].x2 &&
					user.posY + 12.5 > this.props.data[i].y1 && user.posY - 12.5 < this.props.data[i].y2){
				user.collision = true;
			}
		}

		for (var i = 0; i < this.props.triggers.length; i++){
			if (user.posX + 12.5 > this.props.triggers[i].x1 && user.posX - 12.5 < this.props.triggers[i].x2 &&
					user.posY + 12.5 > this.props.triggers[i].y1 && user.posY - 12.5 < this.props.triggers[i].y2){
				this.stateHandler('notInRoom');
			}
		}

		if (user.posX < this.props.triggers[0].x1 && user.posY < this.props.triggers[0].y2){
			var x = Math.floor(techno.length * Math.random());
			currentTrack = techno[x];
			this.stateHandler("room1");
			user.inRoom = true;
		}

		if ((user.posX > this.props.triggers[1].x2) && (user.posY < this.props.triggers[1].y2)){
			var x = Math.floor(indie.length * Math.random());
			currentTrack = indie[x];
			this.stateHandler("room2");
			user.inRoom = true;
		}

		if ((user.posX < this.props.triggers[2].x2) && (user.posY > this.props.triggers[2].y2)){
			var x = Math.floor(house.length * Math.random());
			currentTrack = house[x];
			this.stateHandler("room3");
			user.inRoom = true;
		}

		if ((user.posX > this.props.triggers[3].x2) && (user.posY > this.props.triggers[3].y1)){
			var x = Math.floor(pop.length * Math.random());
			currentTrack = pop[x];
			this.stateHandler("room4");
			user.inRoom = true;
		}

	},

	drawUser: function(){
		var x = 0;
		var imageDirection;
		if (user.imageDirection === "right") x = 'left.png';
		if (user.imageDirection === "left") x = 'right.png';
		if (user.moving === false) x = 'still.png';

		context.drawImage(user.images[x], user.posX - 18, user.posY - 91, 37, 91);
	},

	handleMouseClick: function(event){
		var rect = game.getBoundingClientRect();
		mouseClick.y = event.nativeEvent.clientY - rect.top;
		mouseClick.x = event.nativeEvent.clientX - rect.left;
		distance = Math.sqrt(Math.pow(mouseClick.x - user.posX, 2) + Math.pow(mouseClick.y - user.posY,2));
		user.directionX = (mouseClick.x - user.posX) / distance;
		user.directionY = (mouseClick.y - user.posY) / distance;
		
		if (user.directionX < 0){
			user.imageDirection = "right";
		}
		
		if (user.directionX > 0){
			user.imageDirection = "left";
		}

		if (user.collision = true){
			user.collision = false;
		}
		user.moving = true;
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
	<App interval={10} data={walls} triggers={triggers}/>, document.getElementById('app')
);
