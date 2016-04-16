/**
 * @fileoverview This is a wrapper class for all entities on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * All entities will inherit from this class.
 * @constructor
 * @param {?Array<number>=} position The position of this Entity.
 * @param {?Array<number>=} velocity The velocity of this Entity.
 * @param {?Array<number>=} acceleration The acceleration of this Entity.
 * @param {?Array<number>=} orientation The orientation of this Entity in
 *   along each axis in radians.
 * @param {?number=} hitboxSize The size of the hitbox of this entity. All
 *   entities will have a spherical hitbox where the hitboxSize defines the
 *   radius of the hitbox.
 */
function Entity(position, velocity, acceleration, orientation, hitboxSize) {
  this.position = position || [0, 0, 0];
  this.velocity = velocity || [0, 0, 0];
  this.acceleration = acceleration || [0, 0, 0];
  this.orientation = orientation || [0, 0, 0];
  this.hitboxSize = hitboxSize || 0;

  this.lastUpdateTime = 0;
  this.updateTimeDifference = 0;
}

/**
 * This method returns the x coordinate of the Entity.
 * @return {number}
 */
Entity.prototype.getX = function() {
  return this.position[0];
};

/**
 * This method sets the x coordinate of the Entity.
 * @param {number} x The new x coordinate
 */
Entity.prototype.setX = function(x) {
  this.position[0] = x;
};

/**
 * This method returns the y coordinate of the Entity.
 * @return {number}
 */
Entity.prototype.getY = function() {
  return this.position[1];
};

/**
 * This method sets the y coordinate of the Entity.
 * @param {number} y The new y coordinate
 */
Entity.prototype.setY = function(y) {
  this.position[1] = y;
};

/**
 * This method returns of the z coordinate of the Entity.
 * @return {number}
 */
Entity.prototype.getZ = function() {
  return this.position[2];
};

/**
 * This method sets the z coordinate of the Entity.
 * @param {number} z The new z coordinate
 */
Entity.prototype.setZ = function(z) {
  this.position[2] = z;
};

/**
 * This method gets the x velocity of the Entity.
 * @return {number}
 */
Entity.prototype.getVX = function() {
  return this.velocity[0];
};

/**
 * This method sets the x velocity of the Entity.
 * @param {number} vx The new x velocity
 */
Entity.prototype.setVX = function(vx) {
  this.velocity[0] = vx;
};

/**
 * This method gets the y velocity of the Entity.
 * @return {number}
 */
Entity.prototype.getVY = function() {
  return this.velocity[1];
};

/**
 * This method sets the y velocity of the Entity.
 * @param {number} vy The new y velocity of the Entity.
 */
Entity.prototype.setVY = function(vy) {
  this.velocity[1] = vy;
};

/**
 * This method gets the z velocity of the Entity.
 * @return {number}
 */
Entity.prototype.getVZ = function() {
  return this.velocity[2];
};

/**
 * This method sets the z velocity of the Entity.
 * @param {number} vz The new z velocity of the Entity.
 */
Entity.prototype.setVZ = function(vz) {
  this.velocity[2] = vz;
};

/**
 * This method gets the x acceleration of the Entity.
 * @return {number}
 */
Entity.prototype.getAX = function() {
  return this.acceleration[0];
};

/**
 * This method sets the x acceleration of the Entity.
 * @param {number} ax The new x acceleration of the Entity.
 */
Entity.prototype.setAX = function(ax) {
  this.acceleration[0] = ax;
};

/**
 * This method gets the y acceleration of the Entity.
 * @return {number}
 */
Entity.prototype.getAY = function() {
  return this.acceleration[1];
};

/**
 * This method sets the y acceleration of the Entity.
 * @param {number} ay The new y acceleration of the Entity.
 */
Entity.prototype.setAY = function(ay) {
  this.acceleration[1] = ay;
};

/**
 * This method returns the z acceleration of the Entity.
 * @return {number}
 */
Entity.prototype.getAZ = function() {
  return this.acceleration[2];
};

/**
 * This method sets the z acceleration of the Entity.
 * @param {number} az The new z acceleration of the Entity.
 */
Entity.prototype.setAZ = function(az) {
  this.acceleration[2] = az;
};

/**
 * Returns true if this entity has collided with the given entity.
 * @param {Entity} other The entity to check collision against.
 * @return {boolean}
 */
Entity.prototype.isCollidedWith = function(other) {
  var minDistance = this.hitboxSize + other.hitboxSize;
  return Util.getEuclideanDistance2(
      this.getX(), this.getY(), other.getX(), other.getY()) <
      (minDistance * minDistance);
};

/**
 * Updates the entity's position based on its velocity according to
 * the amount of time the passed between this update and the last
 * update.
 */
Entity.prototype.update = function() {
  if (this.lastUpdateTime == 0) {
    this.updateTimeDifference = 0;
  } else {
    this.updateTimeDifference = (new Date()).getTime() - this.lastUpdateTime;
  }
  for (var i = 0; i < this.position.length; ++i) {
    this.position[i] += this.velocity[i] * this.updateTimeDifference;
    this.velocity[i] += this.acceleration[i] * this.updateTimeDifference;
  }
  this.lastUpdateTime = currentTime;
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Entity;
