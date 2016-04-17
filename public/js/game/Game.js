/**
 * @fileoverview This class handles the drawing and update of the Game on the
 *   client side.
 * @author kenneth@nugget.com (KENNETH YOU NUGGET)
 */

/**
 * Constructor for a Game object.
 * @constructor
 * @param {Socket} socket
 * @param {number} width
 * @param {number} height
 * @param {THREE.Scene} scene
 * @param {Drawing} drawing
 * @param {UIDrawing} ui
 * @param {Input} inputHandler
 * @param {Player} self
 */
function Game(socket, width, height, scene, renderer,
              drawing, ui, inputHandler) {
  this.socket = socket;

  this.width = width;
  this.height = height;

  this.scene = scene;
  this.renderer = renderer;

  this.drawing = drawing;
  this.ui = ui;
  this.inputHandler = inputHandler;

  this.self = null;
  this.otherPlayers = [];
  this.bullets = [];
  this.missiles = [];
  this.explosions = [];

  this.animationFrameId = 0;
}

var x;

/**
 * [function description]
 * @param {Object} socket
 * @param {Element} gameContainer [description]
 * @param {Element} uiCanvas [description]
 * @param {Map} map [description]
 * @return {Game}
 */
Game.create = function(socket, gameContainer, uiCanvas) {
  var width = $(window).width();
  var height = $(window).height();

  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  var rendererDOM = renderer.domElement;

  var drawing = Drawing.create(scene);
  var ui = UI.create(uiCanvas);
  var inputHandler = Input.create(uiCanvas);

  gameContainer.insertBefore(rendererDOM, uiCanvas);
  return new Game(socket, width, height, scene, renderer,
                  drawing, ui, inputHandler);
};

/**
 * [function description]
 */
Game.prototype.init = function() {
  this.drawing.setMap(Map.ENTITIES);

  socket.on('server-state', bind(this, function(data) {
    this.receiveGameState(data);
  }));

  this.animate();
};

/**
 * [function description]
 * @param {[type]} data [description]
 */
Game.prototype.receiveGameState = function(data) {
  x = data;

  if (!!this.self) {
    this.self.update(data['self']['position'], data['self']['orientation']);
  } else {
    this.self = Player.create(this.width / this.height);
    this.self.camera.up = new THREE.Vector3(0, 1, 0);
    this.self.camera.position.set(30, 0, 50);
    this.self.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.self.camera);
  }

  this.otherPlayers = data['otherPlayers'];
  this.bullets = data['bullets'];
  this.missiles = data['missiles'];
  this.explosions = data['explosions'];
};

/**
 * [function description]
 */
Game.prototype.update = function() {
  if (!!this.self) {
    var input = this.inputHandler;
    var mouseControl = [
      Util.linearScale(input.mouseCoords[0], 0, this.width, 1, -1),
      Util.linearScale(input.mouseCoords[1], 0, this.height, 1, -1)
    ];

    socket.emit('player-action', {
      controls: {
        accelerate: input.keys[87] || input.keys[38],
        decelerate: input.keys[83] || input.keys[40],
        gunSelect: input.keys[49],
        missileSelect: input.keys[50]
      },
      fire: input.leftClick,
      mouseControl: mouseControl
    });
  }

  this.draw();
  this.animate();
};

/**
 * [function description]
 */
Game.prototype.draw = function() {
  if (!!this.self) {
    this.drawing.redrawOtherPlayers(this.otherPlayers);
    this.drawing.redrawBullets(this.bullets);
    this.drawing.redrawMissiles(this.missiles);
    this.drawing.redrawExplosions(this.explosions);
    this.renderer.render(this.scene, this.self.camera);
  }
};

/**
 * [function description]
 */
Game.prototype.animate = function() {
  this.animationFrameID = window.requestAnimationFrame(
    bind(this, this.update));
};

/**
 * [function description]
 */
Game.prototype.stopAnimation = function() {
  window.cancelAnimationFrame(this.animationFrameID);
};
