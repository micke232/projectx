
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

            // Clear the canvas
            that.context.clearRect(0, 0, that.width, that.height);

            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                0,
                0,
                that.width / numberOfFrames,
                that.height);
        };

        return that;
    }

    // Get canvas
    canvas = document.getElementById("myCanvas");

    // Create sprite sheet
    characterImage = new Image();

    // Create sprite
    character = sprite({
        context: canvas.getContext("2d"),
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

