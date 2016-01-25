"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
const classNames = require('classnames');
require("./sass/style.scss");
var musicPlayer;
var game;
var context;
var walls = require("json!./data/data.json");

window.user = {
	speed: 300,
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


window.onload = function(){
	SC.initialize({
		client_id: '048fd098861b5d45aabb3862e9e81832'
	})
};
function loadTrack(trackID){
	/*musicPlayer.pause();*/

	SC.stream('/tracks/' + trackID, function(s){
		musicPlayer = s;
		musicPlayer.play();
	});
}

/*
function playMusic(genre){
	console.log(genre);
	SC.get('/tracks',
		{genres: genre},
		function(tracks){
			console.log(tracks);
			var random = Math.floor(Math.random() * tracks.length);
			SC.oEmbed(tracks[random].uri, {auto_play: true, show_comments: false, maxheight: 70, maxwidth: 600}, document.getElementById('soundResult'));
		});
}
*/

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

		if ((user.posX <= 400) && (user.posY <= 200)){
			this.stateHandler("room1");
			if (user.inRoom === false){
				/*playMusic('techno');*/
				loadTrack('294');
				user.inRoom = true;
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
		return (
			<div>
			<div id="soundResult"></div>
			<canvas id="myCanvas" onClick={this.handleMouseClick} className={this.state.room}></canvas>
			</div>
		);
	}
});

ReactDOM.render(
	<App interval={10} data={walls}/>, document.getElementById('app')
);
