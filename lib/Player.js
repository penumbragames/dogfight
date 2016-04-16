/**
 * This class stores the state of the player on the server. This class will
 * also store other important information such as socket ID, packet number,
 * and latency.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * Constructor for a Player.
 * @constructor
 * @param {string} socketId The socket ID of the Player.
 * @param {string} name The display name of the Player.
 * @param {Array<number>} position The position of the Player.
 * @param {Array<number>} orientation The orientation of the Player.
 * @param {number} hitboxSize The hitbox size of the Player.
 */
function Player(socketId, name, position, orientation, hitboxSize) {
  this.socketId = socketId;
  this.name = name;

  this.position = position;
  this.orientation = orientation;

  this.hitboxSize = Player.DEFAULT_HITBOX_SIZE;

  this.vmag = Player.DEFAULT_VELOCITY_MAGNITUDE;
  this.shotCooldown = Player.DEFAULT_SHOT_COOLDOWN;
  this.lastShotTime = 0;

  this.weaponState = Constants.PLAYER_WEAPON_STATE.MISSILE
  this.health = Constants.PLAYER_MAX_HEALTH;
  this.kills = 0;
  this.deaths = 0;
}
require('./inheritable');
Player.inheritsFrom(Entity);

/**
 * DEFAULT_VELOCITY_MAGNITUDE is in pixels per millisecond.
 * @type {number}
 */
Player.DEFAULT_VELOCITY_MAGNITUDE = 0.3;
/**
 * DEFAULT_SHOT_COOLDOWN is in milliseconds.
 * @type {number}
 */
Player.DEFAULT_SHOT_COOLDOWN = 400;
/**
 * DEFAULT_HITBOX_SIZE is in pixels.
 * @type {number}
 */
Player.DEFAULT_HITBOX_SIZE = 32;

/**
 * Returns a new Player object given a name and id.
 * @param {string} socketId The socket ID of the client associated with this
 *   player.
 * @param {string} name The display name of the player.
 * @return {Player}
 */
Player.generateNewPlayer = function(socketId, name) {
  var position = [0, 0, 0];
  return new Player(point[0], point[1], orientation, hitboxSize, name, id,
                    vmag, shotCooldown, health);
};

/**
 * Updates this player given the the client's keyboard state and mouse angle
 * for setting the tank turret.
 */
Player.prototype.updateOnInput = function() {
};

/**
 * Updates the player's position and powerup states, this runs in the 60Hz
 * server side loop so that powerups expire even when the player is not
 * moving or shooting.
 */
Player.prototype.update = function() {
};

/**
 * Returns a boolean determining if the player is dead or not.
 * @return {boolean}
 */
Player.prototype.isDead = function() {
  return this.health <= 0;
};

/**
 * Damages the player by the given amount.
 * @param {number} amount The amount to damage the player by.
 */
Player.prototype.damage = function(amount) {
  this.health = Math.max(this.health - amount, 0);
};

/**
 * Heals the player by the given amount.
 * @param {number} amount The amount to heal the player by.
 */
Player.prototype.heal = function(amount) {
  this.health = Math.min(this.health + amount, Constants.PLAYER_MAX_HEALTH);
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Player;
