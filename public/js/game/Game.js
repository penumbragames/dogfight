/**
 * @fileoverview This class handles the drawing and update of the Game on the
 *   client side.
 * @author kenneth@nugget.com (KENNETH YOU NUGGET)
 */

/**
 * Constructor for a Game object.
 * @param {Socket} socket
 * @param {number} width
 * @param {number} height
 * @param {THREE.Scene} scene
 * @param {Drawing} drawing
 * @param {UIDrawing} ui
 * @param {Input} inputHandler
 * @param {Player} self
 */
function Game(socket, width, height, scene,
              drawing, ui, inputHandler, self) {
  this.socket = socket;

  this.width = width;
  this.height = height;

  this.scene = scene;

  this.drawing = drawing;
  this.ui = ui;
  this.inputHandler = inputHandler;

  this.self = self;
  this.otherPlayers = [];
  this.bullets = [];
  this.missiles = [];
  this.explosions = [];

  this.animationFrameId = 0;
}

Game.create = function(socket, gameCanvas, uiCanvas, map) {
  var width = $(window).width();
  var height = $(window).height();

  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  var drawing = Drawing.create(scene);
  drawing.setMap(map);

  var ui = UI.create(uiCanvas);
  var inputHandler = Input.create(uiCanvas);
  var self = Player.create([0, 0, 0],
                           this.width / this.height);

  return new Game(socket, width, height, scene,
                  drawing, ui, inputHandler);
};

Game.prototype.init = function() {
  socket.on('server-state', bind(this, function(data) {
    this.receiveGameState(data);
  }));
};

Game.prototype.receiveGameState = function(data) {
  this.self = data['self'];
  this.otherPlayers = data['otherPlayers'];
  this.bullets = data['bullets'];
  this.missiles = data['missiles'];
  this.explosions = data['explosions'];
};

Game.prototype.update = function() {
  var input = this.inputHandler;
  var mouseCoords = [
    Util.linearScale(input.mouseCoords[0], 0, this.width, -1, 1),
    Util.linearScale(input.mouseCoords[0], 0, this.height, 1, -1)
  ];

  var packet = {
    controls: {
      accelerate: input.keys[87] || input.keys[38],
      decelerate: input.keys[83] || input.keys[40],
      gunSelect: input.keys[49],
      missileSelect: input.keys[50]
    },
    mouseControl: mouseCoords
  };

  console.log(packet);

  socket.emit('player-action', packet);

  this.draw();
  this.animate();
};

Game.prototype.draw = function() {
  this.drawing.redrawOtherPlayers(this.otherPlayers);
};

Game.prototype.animate = function() {
  this.animationFrameID = window.requestAnimationFrame(
    Util.bind(this, this.update));
};

Game.prototype.stopAnimation = function() {
  window.cancelAnimationFrame(this.animationFrameID);
};
