function Game(socket, gameDrawing, uiDrawing, inputHandler) {
  this.socket = socket;
  this.gameDrawing = gameDrawing;
  this.uiDrawing = uiDrawing;
  this.inputHandler = inputHandler;
}

Game.create = function(socket, gameCanvas, uiCanvas) {
  var gameDrawing = GameDrawing.create(gameCanvas.getContext('2d'));
  var uiDrawing = UIDrawing.create(uiCanvas.getContext('2d'));
  var inputHandler = Input.create(uiCanvas);
  return new Game(socket, gameDrawing, uiDrawing, inputHandler);
}

Game.prototype.init = function() {
  
}

Game.prototype.animate = function() {

}
