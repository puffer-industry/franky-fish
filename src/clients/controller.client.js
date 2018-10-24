(function(window, document) {
    "use strict"

    function onTouchStart(event) {
        event.preventDefault();
        event.target.style.background = 'rgba(136, 43, 170, 0.4)';
    }

    /**
     * Controller client
     * @property {PlayerClient} playerClient
     */
    function controllerClient(playerClient) {
        this.player = playerClient;
        this.element = document.createElement('div');
        this.elementTop = document.createElement('span');
        this.elementRight = document.createElement('span');
        this.elementDown = document.createElement('span');
        this.elementLeft = document.createElement('span');

        this.buildElements();
        this.player.handleWait();
    }

    controllerClient.prototype.update = function(timestamp) {
        this.collisionDetection();
    };

    controllerClient.prototype.collisionDetection = function() {
        for (var index in app.clients) {
            var client = app.clients[index];
            if (client.colliable) {
                var halfHeight = client.image.height / 2;
                var halfWidth = client.image.width / 2;
                var centerX = client.state.x + halfWidth;
                var centerY = client.state.y + halfHeight;
                var playerData = this.player.center();
                var a = Math.abs(centerX - playerData.x);
                var b = Math.abs(centerY - playerData.y);
                var c = Math.pow(a, 2) + Math.pow(b, 2);
                if (c < Math.pow(halfHeight + playerData.r, 2)) {
                    if (client.getLevel() < this.player.getLevel()) {
                        app.addScore(1);
                        this.player.handleScore();
                        client.terminate();
                    } else {
                        this.player.terminate();
                        app.clearClients();
                        app.stop();
                        var shareBoard = document.getElementById('share-board');
                        var startGame = document.getElementById('start-game');
                        startGame.innerText = 'Play Again';
                        shareBoard.style.display = 'block';
                    }
                }
            }
        }
    };

    controllerClient.prototype.getdom = function() {
        return this.element;
    };

    controllerClient.prototype.setHtmlId = function(id) {
        this.element.setAttribute('id', id);
    };

    controllerClient.prototype.buildElements = function() {
        this.elementTop.style.borderTopLeftRadius = '100%';
        this.elementRight.style.borderTopRightRadius = '100%';
        this.elementDown.style.borderBottomRightRadius = '100%';
        this.elementLeft.style.borderBottomLeftRadius = '100%';
        this.element.appendChild(this.elementTop);
        this.element.appendChild(this.elementRight);
        this.element.appendChild(this.elementLeft);
        this.element.appendChild(this.elementDown);

        this.elementTop.ontouchstart = this.onUp.bind(this);
        this.elementRight.ontouchstart = this.onRight.bind(this);
        this.elementDown.ontouchstart = this.onDown.bind(this);
        this.elementLeft.ontouchstart = this.onLeft.bind(this);

        this.elementTop.ontouchend
            = this.elementRight.ontouchend
            = this.elementDown.ontouchend
            = this.elementLeft.ontouchend
            = this.onLoseFocus.bind(this);
    };

    controllerClient.prototype.onUp = function(event) {
        onTouchStart(event)
        this.player.handleUp();
    };

    controllerClient.prototype.onRight = function(event) {
        onTouchStart(event)
        this.player.handleRight();
    };

    controllerClient.prototype.onDown = function(event) {
        onTouchStart(event)
        this.player.handleDown();
    };

    controllerClient.prototype.onLeft = function(event) {
        onTouchStart(event)
        this.player.handleLeft();
    };

    controllerClient.prototype.onLoseFocus = function(event) {
        event.preventDefault();
        event.target.style.background = 'rgba(56, 11, 73, 0.4)';
        this.player.handleWait();
    };

    window.ControllerClient = controllerClient;

})(window, window.document);
