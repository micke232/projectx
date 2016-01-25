var inRoom = "notInRoom";

(function () {

	console.log(123);
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
				if (frameIndex < numberOfFrames[tickCount] - 1) {
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
				that.context.drawImage(that.image[0], frameIndex * that.width[0] / numberOfFrames[0], 0, that.width[0] / numberOfFrames[0], that.height[0], 10, 10, that.width[0] / numberOfFrames[0], that.height[0]);
				
				that.context.drawImage(that.image[1], frameIndex * that.width[1] / numberOfFrames[1], 0, that.width[1] / numberOfFrames[1], that.height[1], 100, 20, that.width[1] / numberOfFrames[1], that.height[1]);
				
				that.context.drawImage(that.image[2], frameIndex * that.width[2] / numberOfFrames[2], 0, that.width[2] / numberOfFrames[2], that.height[2], 150, 100, that.width[2] / numberOfFrames[2], that.height[2]);
				
				that.context.drawImage(that.image[4], frameIndex * that.width[4] / numberOfFrames[4], 0, that.width[4] / numberOfFrames[4], that.height[4], 100, 150, that.width[4] / numberOfFrames[4], that.height[4]);
				
				that.context.drawImage(that.image[5], frameIndex * that.width[5] / numberOfFrames[5], 0, that.width[5] / numberOfFrames[5], that.height[5], 300, 120, that.width[5] / numberOfFrames[5], that.height[5]);
				
				that.context.drawImage(that.image[6], frameIndex * that.width[6] / numberOfFrames[6], 0, that.width[6] / numberOfFrames[6], that.height[6], 200, 200, that.width[6] / numberOfFrames[6], that.height[6]);
				
				that.context.drawImage(that.image[7], frameIndex * that.width[7] / numberOfFrames[7], 0, that.width[7] / numberOfFrames[7], that.height[7], 450, 171, that.width[7] / numberOfFrames[7], that.height[7]);
				
			}			

			if (inRoom === "room2"){
				// Draw the animation
				that.context.drawImage(that.image[0], frameIndex * that.width[0] / numberOfFrames[0], 0, that.width[0] / numberOfFrames[0], that.height[0], 1196, 17, that.width[0] / numberOfFrames[0], that.height[0]);

				that.context.drawImage(that.image[1], frameIndex * that.width[1] / numberOfFrames[1], 0, that.width[1] / numberOfFrames[1], that.height[1], 784, 108, that.width[1] / numberOfFrames[1], that.height[1]);

				that.context.drawImage(that.image[2], frameIndex * that.width[2] / numberOfFrames[2], 0, that.width[2] / numberOfFrames[2], that.height[2], 955, 180, that.width[2] / numberOfFrames[2], that.height[2]);

				that.context.drawImage(that.image[4], frameIndex * that.width[4] / numberOfFrames[4], 0, that.width[4] / numberOfFrames[4], that.height[4], 1079, 155, that.width[4] / numberOfFrames[4], that.height[4]);

			}			

			if (inRoom === "room3"){
				// Draw the animation
				that.context.drawImage(that.image[2], frameIndex * that.width[2] / numberOfFrames[2], 0, that.width[2] / numberOfFrames[2], that.height[2], 107, 485, that.width[2] / numberOfFrames[2], that.height[2]);

				that.context.drawImage(that.image[4], frameIndex * that.width[4] / numberOfFrames[4], 0, that.width[4] / numberOfFrames[4], that.height[4], 218, 545, that.width[4] / numberOfFrames[4], that.height[4]);

				that.context.drawImage(that.image[5], frameIndex * that.width[5] / numberOfFrames[5], 0, that.width[5] / numberOfFrames[5], that.height[5], 400, 600, that.width[5] / numberOfFrames[5], that.height[5]);

				that.context.drawImage(that.image[6], frameIndex * that.width[6] / numberOfFrames[6], 0, that.width[6] / numberOfFrames[6], that.height[6], 341, 495, that.width[6] / numberOfFrames[6], that.height[6]);
			}			

			if (inRoom === "room4"){
				// Draw the animation
				that.context.drawImage(that.image[0], frameIndex * that.width[0] / numberOfFrames[0], 0, that.width[0] / numberOfFrames[0], that.height[0], 793, 501, that.width[0] / numberOfFrames[0], that.height[0]);

				that.context.drawImage(that.image[2], frameIndex * that.width[2] / numberOfFrames[2], 0, that.width[2] / numberOfFrames[2], that.height[2], 1030, 562, that.width[2] / numberOfFrames[2], that.height[2]);

				that.context.drawImage(that.image[4], frameIndex * that.width[4] / numberOfFrames[4], 0, that.width[4] / numberOfFrames[4], that.height[4], 1146, 515, that.width[4] / numberOfFrames[4], that.height[4]);

				that.context.drawImage(that.image[5], frameIndex * that.width[5] / numberOfFrames[5], 0, that.width[5] / numberOfFrames[5], that.height[5], 909, 601, that.width[5] / numberOfFrames[5], that.height[5]);
			}
			if (inRoom === "notInRoom"){


			}
		};

		return that;
	}
	// Get canvas
	context = document.getElementById("myCanvas");

	// Create sprite sheet
	characterImage = new Image();
	characterImage1 = new Image();
	characterImage2 = new Image();
	characterImage3 = new Image();
	characterImage4 = new Image();
	characterImage5 = new Image();
	characterImage6 = new Image();
	characterImage7 = new Image();

	// Create sprite
	character = sprite({
		context: context.getContext("2d"),
		width: [420, 320, 360, 204, 310, 390, 210, 195],
		height: [84, 88, 84, 99, 88, 120, 79, 85],
		image: [characterImage, characterImage1, characterImage2, characterImage3, characterImage4, characterImage5, characterImage6, characterImage7],
		numberOfFrames: [5, 5, 8, 4, 5 , 5, 6, 5],
		ticksPerFrame: 10
	});

	// Load sprite sheet
	characterImage.addEventListener("load", gameLoop);
	characterImage.src = "src/graphics/characters/strong.png";
	characterImage1.src = "src/graphics/characters/guy1.png";
	characterImage2.src = "src/graphics/characters/guy2.png";
	characterImage3.src = "src/graphics/characters/guy3.png";
	characterImage4.src = "src/graphics/characters/guy4.png";
	characterImage5.src = "src/graphics/characters/guy5.png";
	characterImage6.src = "src/graphics/characters/girl1.png";
	characterImage7.src = "src/graphics/characters/girl2.png";

} ());

