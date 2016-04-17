/**
 * @fileoverview This is the client side script for game.html.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var socket = io();
var map = [];
var game = Game.create(socket,
                       $('#gameCanvas')[0],
                       $('#uiCanvas')[0],
                       map);

$(document).ready(function() {
  $.each([$('#gameCanvas'), $('#uiCanvas')], function(i, value) {
      value.prop({
        width: $(window).width(),
        height: $(window).height()
      });
  });

  $('#name-input').focus();

  $('#name-form').submit(function(e) {
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

    e.preventDefault();
    return false;
  });

  init();
});

function init() {
  game.init();
  game.animate();
}
