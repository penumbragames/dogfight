/**
 * @fileoverview This is the server app script.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Constants
var CHAT_TAG = '[Browsercraft]';
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
var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var session = require('express-session');
var sharedSession = require('express-socket.io-session');
var socketIO = require('socket.io');
var swig = require('swig')
var mongodb = require('mongodb');

var router = require('./router/router');
var GameManager = require('./lib/GameManager');
var LobbyManager = require('./lib/LobbyManager');

// Initialization.
var app = express();
var server = http.Server(app);
var sessionConfig = session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
});
var io = socketIO(server);
// var gameManager = GameManager.create();
var lobbyManager = LobbyManager.create(io);

app.engine('html', swig.renderFile);

app.set('port', PORT_NUMBER);
app.set('view engine', 'html');

app.locals.dev_mode = DEV_MODE;

app.use(sessionConfig);
app.use(morgan(':date[web] :method :url :req[header] :remote-addr :status'));
app.use('/public',
        express.static(__dirname + '/public'));
app.use('/shared',
        express.static(__dirname + '/shared'));
// Use request.query for GET request params.
// Use request.body for POST request params.
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

// Allows the sockets to access the session data.
io.use(sharedSession(sessionConfig, {
  autoSave: true
}));

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
    var username = socket.handshake.session.username;
    if (!username) {
      socket.emit('no-username');
      return;
    }
    var status = lobbyManager.addPlayer(socket.id, username);
    callback(status);
  });

  /**
   * This is the event handler for the packet emitted when a player wants
   * to create a room in the lobby.
   */
  socket.on('create-room', function(data, callback) {
    var username = socket.handshake.session.username;
    if (!username) {
      socket.emit('no-username');
      return;
    }
    var status = lobbyManager.createRoom(data.roomName);
    if (status.success) {
      status = lobbyManager.joinRoom(data.roomName, socket.id, true);
    }
    callback(status);
  });

  /**
   * This is the event handler for the packet emitted when a player wants
   * to join a room in the lobby.
   */
  socket.on('join-room', function(data, callback) {
    var username = socket.handshake.session.username;
    if (!username) {
      socket.emit('no-username');
      return;
    }
    var status = lobbyManager.joinRoom(data.roomName, socket.id, false);
    callback(status);
  });

  /**
   * This is the event handler for the packet emitted when a player wants
   * to leave a room that they are in.
   */
  socket.on('leave-room', function(data, callback) {
    var username = socket.handshake.session.username;
    if (!username) {
      socket.emit('no-username');
      return;
    }
    var status = lobbyManager.leaveRoom(socket.id);
    callback(status);
  });

  // Update the internal object states every time a player sends an intent
  // packet.
  socket.on('chat-client-to-server', function(data) {
    var username = socket.handshake.session.username;
    if (!username) {
      socket.emit('no-username');
      return;
    }
    io.sockets.emit('chat-server-to-clients', {
      username: username,
      message: data
    });
  });

  // When a player no-usernames, remove them from the game.
  socket.on('disconnect', function() {
    lobbyManager.removePlayer(socket.id);
  });
});

// Server side game loop, runs at 60Hz and sends out update packets to all
// clients every tick.
setInterval(function() {
}, FRAME_RATE);

setInterval(function() {
  lobbyManager.sendState();
}, LOBBY_UPDATE_RATE);

// Starts the server.
server.listen(PORT_NUMBER, function() {
  console.log('STARTING SERVER ON PORT ' + PORT_NUMBER);
  if (DEV_MODE) {
    console.log('DEVELOPMENT MODE ENABLED: SERVING UNCOMPILED JAVASCRIPT!');
  }
});
