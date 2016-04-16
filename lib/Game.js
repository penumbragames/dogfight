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
 * This method updates the state of a player on the server based on the state
 * of the user's input.
 * @param {string} socketId The socket ID of the Player to update.
 * @param {Object} data The input received from the connected client.
 */
Game.prototype.updatePlayerOnInput = function(socketId, data) {
  var player = this.players.get(socketId);
  player.updatePlayerOnInput(data.controls, data.mouseControl);
};

/**
 * This method updates the state of the entities on the server.
 */
Game.prototype.update = function() {
  var players = this.players.values();
  for (var player of players) {
    player.update();
  }

};

/**
 * Sends the state of the game to all the connected sockets after
 * filtering them appropriately.
 */
Game.prototype.sendState = function() {
  var socketIds = this.players.keys();
  for (var socketId of socketIds) {
    this.io.to(socketId).emit('server-state', {
      self: this.players.get(socketId),
      otherPlayers: this.players.values().filter(function(player) {
        /**
         * Filter out the current Player from the list of other Players.
         */
        return player.id != socketId;
      }),
      bullets: this.bullets,
      missiles: this.missiles,
      explosion: this.explosion
    });
  }
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Game;
