"use strict"

function backgroundLayer() {
    var images = app.get('images');
    var layer = new Layer(app.numericals.width, app.numericals.height);
    var ctx = layer.get2dContext();
    ctx.drawImage(images.background, 0, 0, app.numericals.width, app.numericals.height);
    app.append(layer.getdom());
}

function testFish() {
    var images = app.get('images');
    var layer = new Layer(app.numericals.width, app.numericals.height);
    var fishClient = new FishClient(
        layer,
        images.fish2_2,
        app.numericals.width,
        app.numericals.height / 2,
        'left',
        2
    );
    app.listen(fishClient);
    app.append(layer.getdom());
}
