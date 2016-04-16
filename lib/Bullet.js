/**
 * Stores the state of a bullet on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * Constructor for a bullet.
 * @constructor
 * @param {string} ownerId The socketId of the Player that fired this bullet.
 * @param {Array<number>} position The position of this Bullet.
 * @param {Array<number>} velocity The velocity of this Bullet.
 * @param {Array<number>} orientation The orientation of this Bullet.
 * @extends {Entity}
 */
function Bullet(ownerId, position, velocity, orientation) {
  this.ownerId = ownerId;

  this.position = position;
  this.velocity = velocity;
  this.orientation = orientation;
  this.hitboxSize = Bullet.DEFAULT_HITBOX_SIZE;

  this.damage = Bullet.DEFAULT_DAMAGE;

  this.distanceTraveled = 0;
  this.shouldExist = true;
}
require('./inheritable');
Bullet.inheritsFrom(Entity);

/**
 * VELOCITY_MAGNITUDE is in pixels per millisecond.
 * @const
 * @type {number}
 */
Bullet.VELOCITY_MAGNITUDE = 0.85;

/**
 * DEFAULT_DAMAGE is in health points.
 * @const
 * @type {number}
 */
Bullet.DEFAULT_DAMAGE = 1;

/**
 *
 * MAX_TRAVEL_DISTANCE is in world units.
 * @const
 * @type {number}
 */
Bullet.MAX_TRAVEL_DISTANCE = 1000;

/**
 * HITBOX_SIZE is in world units and represents a radius around the bullet
 * entity.
 * @const
 * @type {number}
 */
Bullet.DEFAULT_HITBOX_SIZE = 4;

/**
 * Factory method for the Bullet object. This is meant to be called from the
 * context of a Player.
 * @param {number} x The starting x-coordinate of the bullet (absolute).
 * @param {number} y The starting y-coordinate of the bullet (absolute).
 * @param {number} direction The direction the bullet will travel in
 *   radians.
 * @return {Bullet}
 */
Bullet.create = function(ownerId, position, orientation) {
  var vx = Bullet.VELOCITY_MAGNITUDE * Math.cos(orientation[0]);
  var vy = Bullet.VELOCITY_MAGNITUDE * Math.sin(orientation[1]);
  var hitboxSize = Bullet.DEFAULT_HITBOX_SIZE;
  var damage = Bullet.DEFAULT_DAMAGE;
  return new Bullet(x, y, vx, vy, direction, hitboxSize, source, damage);
};

/**
 * Updates this bullet and checks for collision with any player.
 */
Bullet.prototype.update = function() {
  this.parent.update.call(this);
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Bullet;
