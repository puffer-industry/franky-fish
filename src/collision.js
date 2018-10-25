(function(window, document) {
    "use strict"
    
    function collision(player, client) {
        var playerPosition = player.getPosition();
        var clientPosition = client.getPosition();
        // var playerX = playerPosition.x + player.getWidth() / 2;
        // var playerY = playerPosition.y + player.getHeight() / 2;
        // var clientX = clientPosition.x + client.image.width / 2;
        // var clientY = clientPosition.y + client.image.height / 2;
        // var c = Math.sqrt(
        //     Math.pow(playerX - clientX, 2) +
        //     Math.pow(playerY - clientY, 2)
        // );
        // return (c <= (player.getRadius() + client.radius));

        return playerPosition.x < clientPosition.x + client.image.width &&
        playerPosition.x + player.getWidth() > clientPosition.x &&
        playerPosition.y < clientPosition.y + client.image.height &&
        player.getHeight() + playerPosition.y > clientPosition.y
    }

    window.collision = collision;

})(window, window.document);
