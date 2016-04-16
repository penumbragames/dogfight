/**
 * @fileoverview This is the server app script.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Constants
var CHAT_TAG = '[Dogfight]';
var DEV_MODE = false;
var FRAME_RATE = 1000 / 60;
var LOBBY_UPDATE_RATE = 500;
var IP = process.env.IP || 'localhost';
var PORT_NUMBER = process.env.PORT || 5000;

// Sets the DEV_MODE constant during development if we run 'node server --dev'
process.argv.forEach(function(value, index, array) {
  if (value == '--dev' || value == '--development') {
    DEV_MODE = true;
  }
});

// Dependencies.
var assert = require('assert');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var socketIO = require('socket.io');
var mongodb = require('mongodb');

var Game = require('./lib/Game');

// Initialization.
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var game = Game.create();

app.set('port', PORT_NUMBER);
app.set('view engine', 'pug');

app.use(morgan(':date[web] :method :url :req[header] :remote-addr :status'));
app.use('/public',
        express.static(__dirname + '/public'));
app.use('/shared',
        express.static(__dirname + '/shared'));

app.use('/', function(request, response) {
  response.render('index.html', {
    DEV_MODE: DEV_MODE
  })
});

/**
 * Server side input handler, modifies the state of the players and the
 * game based on the input it receives. Everything runs asynchronously with
 * the game loop.
 */
io.on('connection', function(socket) {
  /**
   * When a new player joins, the server adds them to the lobby and sends back
   * their username through the callback.
   */
  socket.on('new-player', function(data, callback) {
    if (!data.name || data.name.length > 20) {
      callback({
        success: false,
        message: "Invalid name! Your name cannot be blank or over 20 chars."
      })
    } else {
      game.addNewPlayer(socket.id, data.name);
      callback({
        success: true
      });
    }
  });

  // When a player no-usernames, remove them from the game.
  socket.on('disconnect', function() {
    game.removePlayer(socket.id);
  });
});

// Server side game loop, runs at 60Hz and sends out update packets to all
// clients every tick.
setInterval(function() {
}, FRAME_RATE);

// Starts the server.
server.listen(PORT_NUMBER, function() {
  console.log('STARTING SERVER ON PORT ' + PORT_NUMBER);
  if (DEV_MODE) {
    console.log('DEVELOPMENT MODE ENABLED: SERVING UNCOMPILED JAVASCRIPT!');
  }
});
