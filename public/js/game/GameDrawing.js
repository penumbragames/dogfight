function GameDrawing(context, scene) {
  this.context = context;
  this.scene = scene;
}

GameDrawing.create = function(context) {
  return new GameDrawing(context, scene);
}
