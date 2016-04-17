/**
 * Stores the state of a Missile on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');
var Player = require('./Player');

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * Constructor for a Missile.
 * @constructor
 * @param {string} ownerId The socket ID of the Player that fired this Missile.
 * @param {?Player} playerToTrack The Player that this Missile will track.
 *   Can be null if this missile isn't tracking anyone.
 * @param {Array<number>} position The position of this Missile.
 * @param {Array<number>} velocity The velocity of this Missile.
 * @param {Array<number>} orientation The orientation of this Missile.
 * @extends {Entity}
 */
function Missile(ownerId, playerToTrack, position, velocity, orientation) {
  this.ownerId = ownerId;
  this.playerToTrack = playerToTrack;

  this.position = position;
  this.velocity = velocity;
  this.orientation = orientation;
  this.hitboxSize = Missile.DEFAULT_HITBOX_SIZE;

  this.damage = Missile.DEFAULT_DAMAGE;

  this.distanceTraveled = 0;
  this.shouldExist = true;
}
require('./inheritable');
Missile.inheritsFrom(Entity);

/**
 * VELOCITY_MAGNITUDE is in pixels per millisecond.
 * @const
 * @type {number}
 */
Missile.VELOCITY_MAGNITUDE = 0.85;

/**
 * DEFAULT_DAMAGE is in health points.
 * @const
 * @type {number}
 */
Missile.DEFAULT_DAMAGE = 10;

/**
 *
 * MAX_TRAVEL_DISTANCE is in world units.
 * @const
 * @type {number}
 */
Missile.MAX_TRAVEL_DISTANCE = 1000;

/**
 * HITBOX_SIZE is in world units and represents a radius around the Missile
 * entity.
 * @const
 * @type {number}
 */
Missile.DEFAULT_HITBOX_SIZE = 4;

/**
 * Factory method for the Missile object. This is meant to be called from the
 * context of a Player.
 * @param {Player} owner The Player that fired this Missile.
 * @param {?Player} playerToTrack The Player being tracked by this Missile.
 *   Can be null if this Missile is not tracking a Player.
 * @return {Missile}
 */
Missile.create = function(owner, playerToTrack) {
  var vmag = Bullet.VELOCITY_MAGNITUDE;
  var bulletVelocity = [
    vmag * Math.sin(owner.getPitch()) * Math.cos(owner.getYaw()),
    vmag * Math.cos(owner.getPitch()),
    vmag * Math.sin(owner.getPitch()) * Math.sin(other.getYaw())
  ];
  return new Missile(owner.socketId, playerToTrack, owner.getPosition(),
      bulletVelocity, owner.getOrientation());
};

/**
 * Updates this Missile and checks for collision with any player.
 */
Missile.prototype.update = function() {
  this.parent.update.call(this);
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Missile;
