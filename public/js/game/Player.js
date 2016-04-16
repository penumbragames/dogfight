function Player(camera, position) {
  this.camera = camera;
  this.position = position;

  this.yaw = 0;
  this.pitch = 0;
  this.roll = 0;
}

Player.CAMERA_FIELD_OF_VIEW = 70;

Player.CAMERA_NEAR_CLIPPING_PLANE = 0.1;

Player.CAMERA_FAR_CLIPPING_PLANE = 1000;

Player.create = function(position, aspectRatio) {
  var camera = new THREE.PerspectiveCamera(
    Player.CAMERA_FIELD_OF_VIEW, aspectRatio,
    Player.CAMERA_NEAR_CLIPPING_PLANE, Player.CAMERA_FAR_CLIPPING_PLANE);
  var position = new THREE.Vector3(position[0],
                                   position[1],
                                   position[2]);
  return new Player(camera, position);
};

Player.prototype.update = function(position, orientation) {
  this.camera.position.setX(position[0]);
  this.camera.position.setY(position[1]);
  this.camera.position.setZ(position[2]);
  this.position.copy(this.camera.position);

  this.roll = orientation[0];
  this.yaw = orientation[1];
  this.pitch = orientation[2];
  this.camera.rotation.set(roll, yaw, pitch);
};
  
/*  
    this.camera.lookAt(new THREE.Vector3(
    Math.cos(this.roll) + Math.cos(this.yaw),
    Math.sin(this.roll) + Math.sin(this.pitch),
    Math.sin(this.yaw) + Math.cos(this.pitch)));
*/
};
  
  
