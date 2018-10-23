(function(window, document) {
    "use strict"

    /**
     * Controller client
     * @property {PlayerClient} playerClient
     */
    function controllerClient(playerClient) {
        this.player = playerClient;
        this.element = document.createElement('div');
        this.elementTop = document.createElement('div');
        this.elementRight = document.createElement('div');
        this.elementDown = document.createElement('div');
        this.elementLeft = document.createElement('div');

        this.buildElements();
    }

    controllerClient.prototype.getdom = function() {
        return this.element;
    };

    controllerClient.prototype.setHtmlId = function(id) {
        this.element.setAttribute('id', id);
    };

    controllerClient.prototype.buildElements = function() {
        this.element.appendChild(this.elementTop);
        this.element.appendChild(this.elementRight);
        this.element.appendChild(this.elementDown);
        this.element.appendChild(this.elementLeft);

        this.elementTop.ontouchstart = this.onTop.bind(this);
        this.elementRight.ontouchstart = this.onRight.bind(this);
        this.elementDown.ontouchstart = this.onDown.bind(this);
        this.elementLeft.ontouchstart = this.onLeft.bind(this);

        this.elementTop.ontouchend
            = this.elementRight.ontouchend
            = this.elementDown.ontouchend
            = this.elementLeft.ontouchend
            = this.onLoseFocus.bind(this);
    };

    controllerClient.prototype.onTop = function(event) {

    };

    controllerClient.prototype.onRight = function(event) {

    };

    controllerClient.prototype.onDown = function(event) {

    };

    controllerClient.prototype.onLeft = function(event) {

    };

    controllerClient.prototype.onLoseFocus = function(event) {

    };

    window.ControllerClient = controllerClient;

})(window, window.document);
