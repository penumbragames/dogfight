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
 * @param {number} timeCreated The time that this player was created, this is
 *   used as the starting time for lastInputReceivedTime.
 */
function Player(socketId, name, position, orientation, timeCreated) {
  this.socketId = socketId;
  this.name = name;

  this.position = position;
  this.orientation = orientation;
  this.orientationChangeRate = [0, 0, 0];

  this.hitboxSize = Player.DEFAULT_HITBOX_SIZE;

  this.vmag = Player.DEFAULT_VELOCITY_MAGNITUDE;
  this.shotCooldown = Player.DEFAULT_SHOT_COOLDOWN;
  this.lastShotTime = 0;

  this.weaponState = Constants.PLAYER_WEAPON_STATE.MISSILE;
  this.health = Constants.PLAYER_MAX_HEALTH;
  this.kills = 0;
  this.deaths = 0;

  this.lastInputReceivedTime = timeCreated;
}
require('../shared/inheritable');
Player.inheritsFrom(Entity);

/**
 * DEFAULT_VELOCITY_MAGNITUDE is in pixels per millisecond.
 * @const
 * @type {number}
 */
Player.DEFAULT_VELOCITY_MAGNITUDE = 0.3;
/**
 * DEFAULT_SHOT_COOLDOWN is in milliseconds.
 * @const
 * @type {number}
 */
Player.DEFAULT_SHOT_COOLDOWN = 400;
/**
 * DEFAULT_HITBOX_SIZE is in pixels.
 * @const
 * @type {number}
 */
Player.DEFAULT_HITBOX_SIZE = 32;

/**
 * This is the maximum amount the player can roll per update. (radians / 2)
 * @const
 * @type {number}
 */
Player.ROLL_RATE = 0.1;

/**
 * This is the maximum amount the Player can pitch per update. (radians / s)
 * @const
 * @type {type}
 */
Player.PITCH_RATE = 0.2;

/**
 * This is the factory method for the Player class.
 * @param {string} socketId The socket ID of the client associated with this
 *   player.
 * @param {string} name The display name of the player.
 * @return {Player}
 */
Player.create = function(socketId, name) {
  var position = [0, 0, 0];
  var orientation = [0, 0, 0];
  var timeCreated = (new Date()).getTime();
  return new Player(socketId, name, position, orientation, timeCreated);
};

/**
 * This method updates the Player based on the input that the Player's client
 * sent. Only rates of change are set to prevent unsanitized packets from
 * messing with the game state.
 * @param {Object} controls An object represent the client's intentions to
 *   move.
 * @param {Array<number>} mouseControl A 2-tuple containing the client's
 *   scaled mouse coordinates. Both numbers are from -1 to 1.
 */
Player.prototype.updateOnInput = function(controls, mouseControl) {
  this.lastInputReceivedTime = (new Date()).getTime();

  this.orientationChangeRate[0] = Util.bound(mouseControl[0], -1, 1) *
      Player.ROLL_RATE;
  this.orientationChangeRate[2] = Util.bound(mouseControl[1], -1, 1) *
      Player.PITCH_RATE;

};

/**
 * This method updates the state of the Player.
 */
Player.prototype.update = function() {
  this.parent.update.call(this);

  for (var i = 0; i < this.orientation.length; ++i) {
    this.orientation[i] += this.orientationChangeRate[i];
  }
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
  this.health -= amount;
};

/**
 * Heals the player by the given amount.
 * @param {number} amount The amount to heal the player by.
 */
Player.prototype.heal = function(amount) {
  this.health = Math.min(this.health + amount, Constants.PLAYER_MAX_HEALTH);
};

/**
 * This method returns true if we have not received input packets from this
 * player for a while and they are considered AFK.
 * @return {boolean}
 */
Player.prototype.isAFK = function() {
  return (new Date()).getTime() - this.lastInputReceivedTime <
      Constants.PLAYER_AFK_TIME;
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Player;
