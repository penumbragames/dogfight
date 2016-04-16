/**
 * @fileoverview This file provides the socket.io externs for the project
 *   when compiling with Google's Closure Compiler.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * @type {function()}
 */
var io = function() {};

/**
 * @param {string} name
 * @param {*} args
 */
io.prototype.emit = function(name, args) {};

/**
 * @param {string} event
 * @param {function(*)} handler
 */
io.prototype.on = function(event, handler) {};
