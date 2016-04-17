/**
 * @fileoverview This class handles the drawing/rendering of the 3D objects
 *   on the game canvas.
 * @author Kenneth@nugget.com (KENNETH YOU NUGGET)
 */

/**
 * Constructor for a Drawing object.
 * @constructor
 * @param {THREE.Scene} scene The THREE.js Scene to modify.
 */
function Drawing(scene) {
  this.scene = scene;

  this.map = [];  
  this.otherPlayers = [];
  this.bullets = [];
  this.missiles = [];
  this.explosions = [];
}

/**
 * Factory method for a Drawing class.
 * @param {THREE.Scene} scene The THREE.js Scene to modify.
 * @return {Drawing}
 */
Drawing.create = function(scene) {
  return new Drawing(scene);
};

Drawing.randomBox = function() {
  var box = Map.randomBox();
  var geometry = new THREE.BoxGeometry(box['hitboxSize'],
                                       box['hitboxSize'],
                                       box['hitboxSize']);
  var material = new THREE.MeshBasicMaterial({
    color: Util.randRangeInt(0, 0xFFFFFF)
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(box['position'][0],
                    box['position'][1],
                    box['position'][2]);
  return mesh;  
};

/**
 * This method adds the map to the THREE.js Scene.
 * @param {Object} map
 */
Drawing.prototype.setMap = function(map) {
  var floorGeometry = new THREE.BoxGeometry(2000, 0, 2000);
  var floorMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
  });
  var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  this.scene.add(floorMesh);
  
  for (var i = 0; i < 500; i++) {
    var newMesh = Drawing.randomBox();
    this.map.push(newMesh);
    this.scene.add(newMesh);
  }
};

/**
 * This method redraws the other players in existence.
 * @param {Array<Object>} otherPlayers An array containing the states of the
 *   other players.
 */
Drawing.prototype.redrawOtherPlayers = function(otherPlayers) {
  for (var i = 0; i < this.otherPlayers.length; i++) {
    this.scene.remove(this.otherPlayers[i]);
  }

  this.otherPlayers = [];

  for (var i = 0; i < otherPlayers.length; i++) {
    var playerGeometry = new THREE.BoxGeometry(otherPlayers[i]['hitboxSize'][0],
                                               otherPlayers[i]['hitboxSize'][1],
                                               otherPlayers[i]['hitboxSize'][2]);
    var playerMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF0000
    });
    var playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    playerMesh.position.set.apply(this, otherPlayers[i]['position']);
    this.scene.add(playerMesh);
    this.otherPlayers.push(playerMesh);
  }
};

/**
 * This method redraws bullets in existence.
 * @param {Array<Object>} bullets An array of the bullets to draw.
 */
Drawing.prototype.redrawBullets = function(bullets) {
  for (var i = 0; i < this.bullets.length; i++) {
    this.scene.remove(this.bullets[i]);
  }

  this.bullets = [];

  for (var i = 0; i < bullets.length; i++) {
    var bulletGeometry = new THREE.BoxGeometry(this.bullets[i]['hitboxSize'][0],
                                               this.bullets[i]['hitboxSize'][1],
                                               this.bullets[i]['hitboxSize'][2]);
    var bulletMaterial = new THREE.MeshBasicMaterial({
      color: 0xCCCCCC
    });
    var bulletMesh = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bulletMesh.position.set.apply(this, bullets[i]['position']);
    this.scene.add(bulletMesh);
    this.bullets.push(bulletMesh);
  }
};

/**
 * This method redraws the missiles in existence.
 * @param {Array<Object>} missiles An array of the missiles to draw.
 */
Drawing.prototype.redrawMissiles = function(missiles) {
  for (var i = 0; i < this.missiles.length; i++) {
    this.scene.remove(this.missiles[i]);
  }

  this.missiles = [];

  for (var i = 0; i < missiles.length; i++) {
    var missileGeometry = new THREE.BoxGeometry(this.missiles[i]['hitboxSize'][0],
                                                this.missiles[i]['hitboxSize'][1],
                                                this.missiles[i]['hitboxSize'][2]);
    var missileMaterial = new THREE.MeshBasicMaterial({
      color: 0xCCCCCC
    });
    var missileMesh = new THREE.Mesh(missileGeometry, missileMaterial);
    missileMesh.position.set.apply(this, missiles[i]['position']);
    this.scene.add(missileMesh);
    this.missiles.push(missileMesh);
  }
};

/**
 * This method redraws the explosions in existence.
 * @param {Array<Object>} explosions An array of the explosions in existence.
 */
Drawing.prototype.redrawExplosions = function(explosions) {
  for (var i = 0; i < this.explosions.length; i++) {
    this.scene.remove(this.explosions[i]);
  }

  this.explosions = [];

  for (var i = 0; i < explosions.length; i++) {

  }
};
