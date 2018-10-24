(function(window, document) {
    "use strict"

    function getNumericalValue() {
        var numericalValue = new Object();
        numericalValue.width = document.body.clientWidth;
        numericalValue.height = document.body.clientHeight;

        return numericalValue;
    }

    /**
     * Enture of the game
     * 
     * @param {HTMLElement} element 
     * 
     * @property {HTMLElement} element 
     * @property {Object} numericals
     * @property {Array} clients
     * @property {Object} data
     * @property {Object} state
     */
    function app(element) {
        this.counter = 0;
        this.score = 0;
        this.element = element;
        this.data = new Object();
        this.clients = [];
        this.numericals = getNumericalValue();
        this.state = {
            on: false
        };
        this.scoreElement = document.getElementById('score');
    }

    app.prototype.set = function(key, value) {
        this.data[key] = value;
    };

    app.prototype.get = function(key) {
        return this.data[key];
    };

    app.prototype.append = function(dom) {
        this.element.appendChild(dom);
    };

    app.prototype.getScore = function() {
        return this.score;
    };

    app.prototype.addScore = function(score) {
        this.score += score;
        this.scoreElement.innerText = this.score;
    };

    app.prototype.listen = function(client) {
        client.id = this.counter++;
        this.clients[client.id] = client;
        this.clients[client.id] = client;
    };

    app.prototype.detach = function(client) {
        delete this.clients[client.id];
    }

    app.prototype.clearClients = function() {
        for (var key in this.clients) {
            if (this.clients[key].terminate) {
                this.clients[key].terminate();
            }
        }
        this.clients = [];
    };

    app.prototype.step = function() {
        var step = (timestamp) => {
            if (this.isStarted()) {
                for (var key in this.clients) {
                    this.clients[key].update(timestamp);
                }
                window.requestAnimationFrame(step);
            }
        };
        return step;
    };

    app.prototype.start = function() {
        this.state.on = true;
        window.requestAnimationFrame(this.step());
    };

    app.prototype.stop = function() {
        this.state.on = false;
        console.info('stop');
    };

    app.prototype.isStarted = function() {
        return this.state.on;
    };

    window.App = app;
})(window, window.document);
