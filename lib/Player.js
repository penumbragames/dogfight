/**
 * This class stores the state of the player on the server. This class will
 * also store other important information such as socket ID, packet number,
 * and latency.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Bullet = require('./Bullet');
var Entity = require('./Entity');

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * Constructor for a Player.
 * @constructor
 * @param {number} x The x coordinate to generate the player at.
 * @param {number} y The y coordinate to generate the player at.
 * @param {number} orientation This represents the direction the player will
 *   face and is a radian measure.
 * @param {number} hitboxSize The hitbox size of this player. This number
 *   represents the radius of the circular hitbox in pixels.
 * @param {string} name The display name of the player.
 * @param {string} id The socket ID of the client associated with this
 *   player.
 * @param {number} vmag The magnitude of the player's velocity in
 *   pixels/millisecond.
 * @param {number} shotCooldown The time between the player's shots in
 *   milliseconds.
 * @param {number} health The amount of health that the player starts with.
 */
function Player(x, y, orientation, hitboxSize, name, id,
                vmag, shotCooldown, health) {
  this.x = x;
  this.y = y;
  this.orientation = orientation;
  this.hitboxSize = hitboxSize;

  this.name = name;
  this.id = id;
  this.vmag = vmag;
  this.shotCooldown = shotCooldown;
  this.lastShotTime = 0;

  this.health = health;
  this.praesidia = 0;
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
 * @param {string} name The display name of the player.
 * @param {string} id The socket ID of the client associated with this
 *   player.
 * @return {Player}
 */
Player.generateNewPlayer = function(name, id) {
  var point = Util.getRandomWorldPoint();
  var orientation = Util.randRange(0, 2 * Math.PI);
  var hitboxSize = Player.DEFAULT_HITBOX_SIZE;
  var vmag = Player.DEFAULT_VELOCITY_MAGNITUDE;
  var shotCooldown = Player.DEFAULT_SHOT_COOLDOWN;
  var health = Constants.PLAYER_MAX_HEALTH;
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
