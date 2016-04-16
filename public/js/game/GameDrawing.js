function GameDrawing(context) {
  this.context = context;
}

GameDrawing.create = function(context) {
  return new GameDrawing(context);
}
