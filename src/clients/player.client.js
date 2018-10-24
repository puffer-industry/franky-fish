(function(window, document) {
    "use strict"

    /**
     * Blade effect
     * @property {Layer} layer 
     * @property { CanvasRenderingContext2D } ctx
     */
    function playerClient(layer, x, y) {
        this.layer = layer;
        this.ctx = this.layer.get2dContext();
        var images = app.get('images');
        this.image = images.player;
        this.reversImage = pixelReverse(this.image);
        this.speed = 1;
        this.levels = app.get('levels');

        this.state = {
            timestamp: 0,
            x: x,
            y: y,
            lastX: x,
            lastY: y,
            direction: 'right',
            image: this.reversImage,
            speedX: 0,
            speedY: 0,
            level: this.levels.level1,
            acceleration: 0,
            onTouch: false
        };
    }

    playerClient.prototype.update = function(timestamp) {
        this.render();
        this.state.lastX = this.state.x;
        this.state.x += this.state.speedX * this.state.acceleration;
        this.state.lastY = this.state.y;
        this.state.y += this.state.speedY * this.state.acceleration;
        this.speedUpCushion(0.05);
    };

    playerClient.prototype.speedUpCushion = function(speed) {
        if (this.state.onTouch && this.state.acceleration <= 3) {
            this.state.acceleration += speed;
        }
        if (!this.state.onTouch && this.state.acceleration > 0) {
            this.state.acceleration -= speed;
            if (this.state.acceleration < 0) {
                this.state.acceleration = 0;
            }
        }
    }

    playerClient.prototype.getLevel = function() {
        return this.state.level[2];
    };

    playerClient.prototype.handleRight = function() {
        this.state.direction = 'right';
        this.state.speedY = 0;
        this.state.speedX = this.speed;
        this.state.image = this.reversImage;
        this.state.onTouch = true;
    };

    playerClient.prototype.handleLeft = function() {
        this.state.direction = 'left';
        this.state.speedY = 0;
        this.state.speedX = -this.speed;
        this.state.image = this.image;
        this.state.onTouch = true;
    };

    playerClient.prototype.handleUp = function() {
        this.state.speedX = 0;
        this.state.speedY = -this.speed;
        this.state.onTouch = true;
    };

    playerClient.prototype.handleDown = function() {
        this.state.speedX = 0;
        this.state.speedY = this.speed;
        this.state.onTouch = true;
    };

    playerClient.prototype.handleWait = function() {
        this.state.onTouch = false;
    };

    playerClient.prototype.handleScore = function() {
        var score = app.getScore();
        var currentLevel = this.levels.level1;
        for (var index in this.levels) {
            var level = this.levels[index];
            if (level[3] <= score) {
                currentLevel = level;
            }
        }
        this.state.level = currentLevel;
    }

    playerClient.prototype.center = function() {
        var w = this.state.level[0];
        var h = this.state.level[1];
        var halfWidth = w / 2;
        var halfHeight = h / 2;
        var centerX = this.state.x + halfWidth;
        var centerY = this.state.y + halfHeight;
        return {x: centerX, y: centerY, r: halfHeight};
    };

    playerClient.prototype.setCurrentImage = function() {
        if (this.state.direction = 'right') {
            this.state.image = this.reversImage;
        }
        this.state.image = this.image;
    }

    playerClient.prototype.render = function() {
        var w = this.state.level[0];
        var h = this.state.level[1];
        this.ctx.clearRect(
            this.state.lastX,
            this.state.lastY,
            w,
            h
        );
        this.ctx.drawImage(this.state.image, this.state.x, this.state.y, w, h);
    };

    playerClient.prototype.terminate = function() {
        app.detach(this);
        this.layer.terminate();
    };

    window.PlayerClient = playerClient;

})(window, window.document);
