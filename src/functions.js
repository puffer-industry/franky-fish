"use strict"

function backgroundLayer() {
    var images = app.get('images');
    var layer = new Layer(app.numericals.width, app.numericals.height);
    var ctx = layer.get2dContext();
    ctx.drawImage(images.background, 0, 0, app.numericals.width, app.numericals.height);
    app.append(layer.getdom());
}

function playerLayer() {
    var layer = new Layer(app.numericals.width, app.numericals.height);
    var playerClient = new PlayerClient(layer, app.numericals.width / 2, app.numericals.height / 2);
    app.listen(playerClient);
    app.append(layer.getdom());
    return playerClient;
}

function pixelReverseArray(images) {
    var newImages = [];
    for (var key in images) {
        newImages[key] = images[key];
        newImages[key + '_r'] = pixelReverse(images[key]);
    }
    return newImages;
}

function pixelReverse(image) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    for (var pixel = 1; pixel <= image.width; pixel++) {
        ctx.drawImage(image, image.width - pixel, 0, 1, image.height, pixel, 0, 1, image.height);
    }
    return canvas;
}

function getRandomNumber(max){
    return Math.floor(Math.random() * (max + 1));
}
