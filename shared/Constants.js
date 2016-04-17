/**
 * @fileoverview This class stores global constants between the client and
 *   server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * Empty constructor for the Constants class.
 */
function Constants() {
  throw new Error('Constants should not be instantiated!');
}

/**
 * @const
 * @type {string}
 */
Constants.BIG_FUCKUP_ERROR = 'This should not happen! Tell Alvin immediately!';

/**
 * @const
 * @type {number}
 */
Constants.WORLD_MIN = 0;

/**
 * @const
 * @type {number}
 */
Constants.WORLD_MAX = 2500;

/**
 * @const
 * @type {Object}
 */
Constants.PLAYER_WEAPON_STATE = {
  BULLET: 'BULLET',
  MISSILE: 'MISSILE'
};

/**
 * @const
 * @type {number}
 */
Constants.PLAYER_AFK_TIME = 60000;

if (typeof module === 'object') {
  /**
   * If this is being imported on the server side, then we load this with
   * module.exports.
   */
  module.exports = Constants;
} else {
  /**
   * Otherwise, we load it into the global namespace.
   */
  window.Constants = Constants;
}
