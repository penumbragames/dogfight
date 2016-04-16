function UIDrawing(context) {
  this.context = context;
}

UIDrawing.create = function(context) {
  return new UIDrawing(context);
}
