/**
 * @fileoverview This is a wrapper class for all entities on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var copy = require('shallow-copy');
var cross = require('vectors/cross')(3);
var dot = require('vectors/dot')(3);
var mag = require('vectors/mag')(3);
var sub = require('vectors/sub')(3);

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * All entities will inherit from this class.
 * @constructor
 * @param {?Array<number>=} position The position of this Entity.
 * @param {?Array<number>=} velocity The velocity of this Entity.
 * @param {?Array<number>=} acceleration The acceleration of this Entity.
 * @param {?Array<number>=} orientation The orientation of this Entity in
 *   along each axis in radians. This is the roll, yaw, pitch.
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
 * @param {number} x The new x coordinate of the Entity.
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
 * @param {number} y The new y coordinate of the Entity.
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
 * @param {number} z The new z coordinate of the Entity.
 */
Entity.prototype.setZ = function(z) {
  this.position[2] = z;
};

/**
 * This method gets the position of the Entity.
 * @return {Array<number>}
 */
Entity.prototype.getPosition = function() {
  return copy(this.position);
};

/**
 * This method sets the position of the Entity.
 * @param {Array<number>} position The new position of the Entity.
 */
Entity.prototype.setPosition = function(position) {
  this.position = copy(position);
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
 * @param {number} vx The new x velocity of the Entity.
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
 * This method returns the velocity of the Entity.
 * @return {Array<number>}
 */
Entity.prototype.getVelocity = function() {
  return copy(this.velocity);
};

/**
 * This method sets the velocity of the Entity.
 * @param {Array<number>} velocity The new velocity of the Entity.
 */
Entity.prototype.setVelocity = function(velocity) {
  this.velocity = copy(velocity);
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
 * This method returns the acceleration of the Entity.
 * @return {Array<number>}
 */
Entity.prototype.getAcceleration = function() {
  return copy(this.acceleration);
};

/**
 * This method sets the acceleration of the Entity.
 * @param {Array<number>} acceleration The new acceleration of the Entity.
 */
Entity.prototype.setAcceleration = function(acceleration) {
  this.acceleration = copy(acceleration);
};

/**
 * This method returns the roll of the Entity.
 * @return {number}
 */
Entity.prototype.getRoll = function() {
  return this.orientation[0];
};

/**
 * This method sets the roll of the Entity.
 * @param {number} roll The new roll of the Entity.
 */
Entity.prototype.setRoll = function(roll) {
  this.orientation[0] = roll;
};

/**
 * This method returns the yaw of the Entity.
 * @return {number}
 */
Entity.prototype.getYaw = function() {
  return this.orientation[1];
};

/**
 * This method sets the yaw of the Entity.
 * @param {number} yaw The new yaw of the Entity.
 */
Entity.prototype.setYaw = function(yaw) {
  this.orientation[1] = yaw;
};

/**
 * This method returns the pitch of the Entity.
 * @return {number}
 */
Entity.prototype.getPitch = function() {
  return this.orientation[2];
};

/**
 * This method sets the pitch of the Entity.
 * @param {number} pitch The new pitch of the Entity.
 */
Entity.prototype.setPitch = function(pitch) {
  this.orientation[2] = pitch;
};

/**
 * This method returns the orientation of the Entity.
 * @return {Array<number>}
 */
Entity.prototype.getOrientation = function() {
  return copy(this.orientation);
};

/**
 * This method sets the orientation of the Entity.
 * @param {Array<number>} orientation The new orientation of the Entity.
 */
Entity.prototype.setOrientation = function(orientation) {
  this.orientation = copy(orientation);
};

/**
 * This method returns true if this Entity has collided with the given Entity.
 * @param {Entity} other The entity to check collision against.
 * @return {boolean}
 */
Entity.prototype.isCollidedWith = function(other) {
  var minDistance = this.hitboxSize + other.hitboxSize;
  return Util.getEuclideanDistance2(
      this.getX(), this.getY(), this.getZ(),
      other.getX(), other.getY(), other.getZ()) <
      (minDistance * minDistance);
};

/**
 * This method returns the Manhattan distance between itself and another given
 * Entity.
 * @param {Entity} other The Entity to calculate the distance to.
 * @return {number}
 */
Entity.prototype.getManhattanDistanceTo = function(other) {
  return Util.getManhattanDistanceTo(this.getX(), this.getY(), this.getZ(),
                                     other.getX(), other.getY(), other.getZ());
};

/**
 * This method returns the squared Euclidean distance between itself and
 * another given Entity.
 * @param {Entity} other The Entity to calculate the distance to.
 * @return {number}
 */
Entity.prototype.getEuclideanDistance2To = function(other) {
  return Util.getEuclideanDistance2(this.getX(), this.getY(), this.getZ(),
                                    other.getX(), other.getY(), other.getZ());
};

/**
 * This method returns the Euclidean distance between itself and another given
 * Entity.
 * @param {Entity} other The Entity to calculate the distance to.
 * @return {number}
 */
Entity.prototype.getEuclideanDistanceTo = function(other) {
  return Util.getEuclideanDistanceTo(this.getX(), this.getY(), this.getZ(),
                                     other.getX(), other.getY(), other.getZ());
};

/**
 * This method calculates the distance between itself and a given line segment.
 * Taken from http://stackoverflow.com/questions/4858264/
 *   find-the-distance-from-a-3d-point-to-a-line-segment
 * @param {Array<number>} a The first endpoint of the line segment.
 * @param {Array<number>} b the second endpoint of the line segment.
 */
Entity.prototype.getDistanceToLineSegment = function(a, b) {
  var v = this.getPosition();
  var ab = b.sub(a);
  var av = v.sub(a);
  if (dot(av, ab) < 0) {
    return mag(av);
  }
  var bv = v.sub(b);
  if (dot(bv, ab) < 0) {
    return mag(bv);
  }
  return mag(cross(ab, av)) / mag(ab);
};

/**
 * This method updates the entity's position based on its velocity according to
 * the amount of time the passed between this update and the last update. This
 * allows the server side update to be tick independent.
 */
Entity.prototype.update = function() {
  var currentTime = (new Date()).getTime();
  if (this.lastUpdateTime == 0) {
    this.updateTimeDifference = 0;
  } else {
    this.updateTimeDifference = (currentTime - this.lastUpdateTime) / 1000;
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
