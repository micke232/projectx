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

window.user = {
	speed: 500,
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
	collision: false
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

window.onload = function(){
	SC.initialize({
		client_id: '048fd098861b5d45aabb3862e9e81832'
	})
};
function loadTrack(trackID){
	SC.stream('/tracks/' + trackID, function(track){
		musicPlayer = track;
		if (user.inRoom == true){
			musicPlayer.play();
		}
		if (user.inRoom == false){
			musicPlayer.pause();
		}
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
					user.inRoom = false;
					this.stateHandler('notInRoom');
					loadTrack();
		 		}
		}

		if ((user.posX <= 400) && (user.posY <= 200)){
			this.stateHandler("room1"); /* techno */
			if (user.inRoom === false){
				user.inRoom = true;
				console.log('room1 techno');
				loadTrack('164932466'); /* detroit techno militia - the grid (ep36) */
			}
		}

		if ((user.posX >= 880) && (user.posY <= 200)){
			this.stateHandler("room2"); /* indie - ändra till rock? */
			if (user.inRoom === false){
				user.inRoom = true;
				console.log('room2 indie');
				loadTrack('14615470');	/* woods - suffering season */
			}
		}

		if ((user.posX <= 400) && (user.posY >= 425)){
			this.stateHandler("room3"); /* house */
			if (user.inRoom === false){
				user.inRoom = true;
				console.log('room3 house');
				loadTrack('66673724'); /* octo octa - memories */
			}
		}

		if ((user.posX >= 880) && (user.posY >= 425)){
			this.stateHandler("room4"); /* pop */
			if (user.inRoom === false){
				user.inRoom = true;
				console.log('room4 pop');
				loadTrack('187135056'); /* laser & bas - dansa så */
			}
		}



	},

	drawUser: function(){
		context.beginPath();
		context.arc(user.posX, user.posY, user.sizeX, 0, 2*Math.PI);
		context.fillStyle = "#c31b48";
		context.fill();
//		var img = new Image();
//		img.src = 'src/graphics/megamanShot32.png';
//		context.drawImage(img, user.posX, user.posY, user.sizeX, user.sizeY);
	},

	handleMouseClick: function(event){


		var rect = game.getBoundingClientRect();
		mouseClick.y = event.nativeEvent.clientY - rect.top;
		mouseClick.x = event.nativeEvent.clientX - rect.left;
		distance = Math.sqrt(Math.pow(mouseClick.x - user.posX, 2) + Math.pow(mouseClick.y - user.posY,2));
		user.directionX = (mouseClick.x - user.posX) / distance;
		user.directionY = (mouseClick.y - user.posY) / distance;
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


		var canvasClasses = classNames(
			"test1",
			"test2"
		);

		return (
			<div>
				<div id="soundResult" className={canvasClasses}></div>
				<canvas id="myCanvas" onClick={this.handleMouseClick} className={this.state.room}></canvas>
			</div>
		);
	}
});

ReactDOM.render(
	<App interval={10} data={walls} triggers={triggers}/>, document.getElementById('app')
);
