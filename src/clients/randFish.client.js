(function(window, document) {
    "use strict"

    function randFishClient(layer) {
        this.timestamp = 0;
        this.layer = layer;
    }

    randFishClient.prototype.update = function(timestamp) {
        if (timestamp - this.timestamp > 1300) {
            var images = app.get('images');
            var level = getRandomNumber(3);
            var number = getRandomNumber(4);
            var sharkRand = getRandomNumber(13);
            if (sharkRand === 0) {
                var level = 4;
                var number = 0;
            }
            var direction = getRandomNumber(1);
            var y = getRandomNumber(app.numericals.height - 30);
            var key = 'fish_' + level + '_' + number;
            this.newFish(
                (direction == 0) ? images[key] : images[key + '_r'],
                level,
                (direction == 0) ? 'left' : 'right',
                y
            );

            this.timestamp = timestamp;
        }
    };

    randFishClient.prototype.newFish = function(image, level, direction, y) {
        var x = direction == 'left' ? app.numericals.width + image.width : 0 - image.width;
        var fishClient = new FishClient(
            this.layer,
            image,
            x,
            y,
            direction,
            level,
            2
        );
        app.listen(fishClient);
        app.append(this.layer.getdom());
    }

    randFishClient.prototype.terminate = function() {
        app.detach(this);
    };

    window.RandFishClient = randFishClient;

})(window, window.document);