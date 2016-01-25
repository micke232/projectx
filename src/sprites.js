var inRoom = "notInRoom";
(function () {

	var character,
			characterImage,
			canvas;

	function gameLoop () {

		window.requestAnimationFrame(gameLoop);

		character.update();
		character.render();
	}

	function sprite (options) {

		var that = {},
				frameIndex = 0,
				tickCount = 0,
				ticksPerFrame = options.ticksPerFrame || 0,
				numberOfFrames = options.numberOfFrames || 1;

		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;

		that.update = function () {

			tickCount += 1;

			if (tickCount > ticksPerFrame) {

				tickCount = 0;

				// If the current frame index is in range
				if (frameIndex < numberOfFrames - 1) {
					// Go to the next frame
					frameIndex += 1;
				} else {
					frameIndex = 0;
				}
			}
		};

		that.render = function () {

			if (inRoom === "room1"){
				// Draw the animation
				that.context.drawImage(that.image, frameIndex * that.width / numberOfFrames, 0, that.width / numberOfFrames, that.height, 50, 50, that.width / numberOfFrames, that.height);
			
		}			
			
			if (inRoom === "room2"){
				// Draw the animation
			
		}			
			
			if (inRoom === "room3"){
				// Draw the animation
			
		}			
			
			if (inRoom === "room4"){
				// Draw the animation
			
		}
			if (inRoom === "notInRoom"){
				taht.context.clearRect(0, 0, that.context.canvas.width, that.context.canvas.height);
			}
		};

		return that;
	}
//	that.context.drawImage(that.image, frameIndex * that.width / numberOfFrames, 0, that.width / numberOfFrames, that.height, 0, 0, that.width / numberOfFrames, that.height);
	// Get canvas
	context = document.getElementById("myCanvas");

	// Create sprite sheet
	characterImage = new Image();

	// Create sprite
	character = sprite({
		context: context.getContext("2d"),
		width: 420,
		height: 84,
		image: characterImage,
		numberOfFrames: 5,
		ticksPerFrame: 10
	});

	// Load sprite sheet
	characterImage.addEventListener("load", gameLoop);
	characterImage.src = "src/graphics/characters/strong.png";

} ());

