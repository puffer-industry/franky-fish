(function(window, document) {
    "use strict"

    function randFishClient() {
        this.timestamp = 0;
    }

    randFishClient.prototype.update = function(timestamp) {
        if (timestamp - this.timestamp > 1000) {
            var images = app.get('images');
            var level = getRandomNumber(2);
            var number = getRandomNumber(1);
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
        var layer = new Layer(app.numericals.width, app.numericals.height);
        var x = direction == 'left' ? app.numericals.width : 0;
        var fishClient = new FishClient(
            layer,
            image,
            x,
            y,
            direction,
            level,
            2
        );
        app.listen(fishClient);
        app.append(layer.getdom());
    }

    window.RandFishClient = randFishClient;

})(window, window.document);