function UI(context) {
  this.context = context;
}

UI.create = function(canvas) {
  return new UI(canvas.getContext('2d'));
}
