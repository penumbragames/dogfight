function Player(camera) {
  this.camera = camera;
  this.position = [0, 0, 0];
  this.orientation = [0, 0, 0];
}

Player.CAMERA_FIELD_OF_VIEW = 70;

Player.CAMERA_NEAR_CLIPPING_PLANE = 0.1;

Player.CAMERA_FAR_CLIPPING_PLANE = 1000;

Player.create = function(aspectRatio) {
  var camera = new THREE.PerspectiveCamera(
    Player.CAMERA_FIELD_OF_VIEW, aspectRatio,
    Player.CAMERA_NEAR_CLIPPING_PLANE, Player.CAMERA_FAR_CLIPPING_PLANE);
  return new Player(camera);
};

Player.prototype.update = function(position, orientation) {
  this.camera.position.set(position[0], position[1], position[2]);
  // orientation = [pitch, yaw, roll]
  //this.camera.rotation.set(orientation[0], orientation[1] - Math.PI, orientation[2]);

  console.log(this.camera.rotation);

  this.camera.rotation.order = 'ZYX';
  this.camera.rotation.x = orientation[0];
  this.camera.rotation.y = orientation[1];
  this.camera.rotation.z = orientation[2];
  
  for (var i = 0; i < 3; i++) {
    this.position[i] = this.camera.position[i];
  }
};

  
  
