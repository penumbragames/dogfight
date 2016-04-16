/**
 * @fileoverview This file provides the Howler.js externs for the project
 *   when compiling with Google's Closure Compiler.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * @type {function(*)}
 */
var Howl = function() {};

/**
 * @param {string=} sprite
 * @param {function(*)=} callback
 */
Howl.prototype.play = function(sprite, callback) {};

/**
 * @param {number=} id
 */
Howl.prototype.pause = function(id) {};

/**
 * @param {number=} id
 */
Howl.prototype.stop = function(id) {};

/**
 * @param {number=} id
 */
Howl.prototype.mute = function(id) {};

/**
 * @param {number=} id
 */
Howl.prototype.unmute = function(id) {};

/**
 * @param {number=} id
 */
Howl.prototype.unmute = function(id) {};

/**
 * @param {boolean=} loop
 */
Howl.prototype.loop = function(loop) {};

/**
 * @param {number=} position
 * @param {number=} id
 */
Howl.prototype.pos = function(position, id) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} id
 */
Howl.prototype.pos3d = function(x, y, z, id) {};

/**
 * @param {Object} sprite
 */
Howl.prototype.sprite = function(sprite) {};

/**
 * @param {number} volume
 * @param {number} id
 */
Howl.prototype.volume = function(volume, id) {};

/**
 * @param {Array<string>} urls
 */
Howl.prototype.urls = function(urls) {};

/**
 * @param {string} event
 * @param {function(*)} callback
 */
Howl.prototype.on = function(event, callback) {};

/**
 * @param {string} event
 * @param {function(*)} callback
 */
Howl.prototype.off = function(event, callback) {};

/**
 * Unload and destroy a Howl object. This will immediately stop
 * all play instances attached to this sound and remove it from the cache.
 */
Howl.prototype.unload = function() {};
