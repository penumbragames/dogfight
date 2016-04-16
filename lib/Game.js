/**
 * @fileoverview This class encapsulates an active game on the server and
 *   handles the updating of the players and entities in the game.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var HashMap = require('hashmap');

var Player = require('./Player');

var Util = require('../shared/Util');

/**
 * Constructor for the server side Game class.
 * Instantiates the data structures to track all the objects
 * in the game.
 * @constructor
 * @param {Object} io The Socket.IO server.
 */
function Game(io) {

  this.io = io;

  /**
   * This is a hashmap containing all the connected socket ids and the players
   * associated with them.
   */
  this.players = new HashMap();

  this.bullets = [];
  this.missiles = [];
  this.explosions = [];
  this.map = [];
}

/**
 * Factory method for a Game class.
 * @param {Object} io The Socket.IO server.
 * @return {Game}
 */
Game.create = function(io) {
  return new Game(io);
};

/**
 * Creates a new player with the given name and ID.
 * @param {string} socketId The socket ID of the player to add.
 * @param {string} name The display name of the player.
 */
Game.prototype.addNewPlayer = function(socketId, name) {
  this.players.set(socketId, Player.create(socketId, name));
};

/**
 * Removes the player with the given socket ID and returns the name of the
 * player removed.
 * @param {string} socketId The socket ID of the player to remove.
 * @return {string}
 */
Game.prototype.removePlayer = function(socketId) {
  var player = this.players.get(socketId);
  this.players.remove(socketId);
  return player.name;
};

/**
 * Updates the player with the given ID according to the
 * input state sent by that player's client.
 */
Game.prototype.updatePlayerOnInput = function() {
};

/**
 * Sends the state of the game to all the connected sockets after
 * filtering them appropriately.
 */
Game.prototype.sendState = function() {

};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Game;
