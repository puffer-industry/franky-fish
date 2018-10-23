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
        this.speed = 2;
        this.levels = app.get('levels')['level1'];

        this.state = {
            timestamp: 0,
            x: x,
            y: y,
            lastX: x,
            lastY: y,
            direction: 'right',
            image: this.reversImage,
            speed: this.speed,
            level: 1
        };
        this.handleRight();
    }

    playerClient.prototype.update = function(timestamp) {
        this.render();
    };

    playerClient.prototype.handleRight = function() {
        this.state.direction = 'right';
        this.state.speed = this.speed;
        this.state.image = this.reversImage;
    };

    playerClient.prototype.handleLeft = function() {
        this.state.direction = 'left';
        this.state.speed = -this.speed;
        this.state.image = this.image;
    };

    playerClient.prototype.setCurrentImage = function() {
        if (this.state.direction = 'right') {
            this.state.image = this.reversImage;
        }
        this.state.image = this.image;
    }

    playerClient.prototype.render = function() {
        var w = this.levels[0];
        var h = this.levels[1];
        this.ctx.clearRect(
            this.state.lastX,
            this.state.lastY,
            this.state.image.width,
            this.state.image.height
        );
        this.ctx.drawImage(this.state.image, this.state.x, this.state.y, w, h);
    };

    window.PlayerClient = playerClient;

})(window, window.document);
