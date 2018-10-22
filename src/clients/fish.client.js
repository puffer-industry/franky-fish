// yellowFish
(function(window, document) {
    "use strict"

    /**
     * Blade effect
     * @property {Layer} layer 
     * @property { CanvasRenderingContext2D } ctx
     */
    function fishClient(layer, image, x, y, direction, speed) {
        this.layer = layer;
        this.ctx = this.layer.get2dContext();
        this.direction = direction;
        this.speed = (direction === 'left') ? -speed : speed;

        this.state = {
            timestamp: 0,
            x: x,
            y: y,
            lastX: x,
            image: image,
        };
    }

    fishClient.prototype.update = function(timestamp) {
        // if (timestamp - this.state.timestamp >= 5) {
            this.drawFish(
                this.state.image,
                this.state.x,
                this.state.y
            );
            this.state.lastX = this.state.x;
            this.state.x += this.speed;
            // this.state.timestamp = timestamp;
        // }
    };

    fishClient.prototype.drawFish = function(image, x, y) {
        this.ctx.clearRect(this.state.lastX, y, image.width, image.height);
        this.ctx.drawImage(image, x, y);
    };

    window.FishClient = fishClient;

})(window, window.document);
