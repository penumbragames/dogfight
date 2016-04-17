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

/**
 * This method adds the map to the THREE.js Scene.
 * @param {Object} map
 */
Drawing.prototype.setMap = function(map) {
  for (var i = 0; i < map.length; i++) {
    var newGeometry = new THREE.BoxGeometry(map[i]['hitboxSize'] * 2,
                                            map[i]['hitboxSize'] * 2,
                                            map[i]['hitboxSize'] * 2);
    var newMaterial = new THREE.MeshBasicMaterial({
      color: map[i].color
    });
    var newMesh = new THREE.Mesh(newGeometry, newMaterial);
    newMesh.position.setX(map[i]['position'][0]);
    newMesh.position.setY(map[i]['position'][1]);
    newMesh.position.setZ(map[i]['position'][2]);
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
    var playerGeometry = new THREE.BoxGeometry(
        otherPlayers[i]['hitboxSize'][0] * 2,
        otherPlayers[i]['hitboxSize'][1] * 2,
        otherPlayers[i]['hitboxSize'][2] * 2);
    var playerMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF0000
    });
    var playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    playerMesh.position.setX(otherPlayers[i]['position'][0]);
    playerMesh.position.setY(otherPlayers[i]['position'][1]);
    playerMesh.position.setZ(otherPlayers[i]['position'][2]);
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
    var bulletGeometry = new THREE.BoxGeometry(
        bullets[i]['hitboxSize'][0] * 2,
        bullets[i]['hitboxSize'][1] * 2,
        bullets[i]['hitboxSize'][2] * 2);
    var bulletMaterial = new THREE.MeshBasicMaterial({
      color: 0xCCCCCC
    });
    var bulletMesh = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bulletMesh.position.setX(bullets[i]['position'][0]);
    bulletMesh.position.setY(bullets[i]['position'][1]);
    bulletMesh.position.setZ(bullets[i]['position'][2]);
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
    var missileGeometry = new THREE.BoxGeometry(
        missiles[i]['hitboxSize'][0] * 2,
        missiles[i]['hitboxSize'][1] * 2,
        missiles[i]['hitboxSize'][2] * 2);
    var missileMaterial = new THREE.MeshBasicMaterial({
      color: 0x999999
    });
    var missileMesh = new THREE.Mesh(missileGeometry, missileMaterial);
    missileMesh.position.setX(missiles[i]['position'][0]);
    missileMesh.position.setY(missiles[i]['position'][1]);
    missileMesh.position.setZ(missiles[i]['position'][2]);
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
