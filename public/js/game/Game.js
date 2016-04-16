function Game(socket, gameDrawing, uiDrawing, inputHandler) {
  this.socket = socket;
  this.gameDrawing = gameDrawing;
  this.uiDrawing = uiDrawing;
  this.inputHandler = inputHandler;

  this.animationFrameId = 0;
}

Game.create = function(socket, gameCanvas, uiCanvas) {
  var gameDrawing = GameDrawing.create(gameCanvas.getContext('2d'));
  var uiDrawing = UIDrawing.create(uiCanvas.getContext('2d'));
  var inputHandler = Input.create(uiCanvas);
  return new Game(socket, gameDrawing, uiDrawing, inputHandler);
};

Game.prototype.init = function() {
  socket.on('player-update', Util.bind(this, function(data) {
    this.receiveGameState(data);
  }));
};

Game.prototype.update = function() {
  var input = this.inputHandler;

  var packet = {
    controls: {
      accelerate: input.keys[87] || input.keys[38],
      decelerate: input.keys[83] || input.keys[40],
      gunSelect: input.keys[49],
      missileSelect: input.keys[50]
    },
    mouseControl: [0, 0]
  };

  console.log(packet);

  socket.emit('player-action', packet);
};

Game.prototype.animate = function() {
  this.animationFrameID = window.requestAnimationFrame(
    Util.bind(this, this.update));
};

Game.prototype.stopAnimation = function() {
  window.cancelAnimationFrame(this.animationFrameID);
};
