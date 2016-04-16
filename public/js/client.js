/**
 * @fileoverview This is the client side script for game.html.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var socket = io();
var game = Game.create(socket, $('#gameCanvas')[0], $('#uiCanvas')[0]);

$(document).ready(function() {
  $('#gameCanvas').prop({
    width: $(window).width(),
    height: $(window).height()
  });

  $('#name-input').focus();

  $('#name-form').submit = function() {
    socket.emit('new-player', {
      name: 'blarg'
    }, function(data) {
      if (data['success']) {
        $('#name-prompt').hide();
        $('#uiCanvas').focus();
      } else {
        window.alert(data['message']);
      }
    });

    return false;
  };

  init();
});

function init() {
  game.init();
  game.animate();
}
