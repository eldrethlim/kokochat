$(document).ready(function() {
  var socket = io();

  var username = prompt("Hi, what's your name?")

  socket.on('initialize', function(message) {
    $('#messages').append('<li>' + message + '</li>')
  });

  socket.on('message', function(message) {
    $('#messages').append('<li>' + message + '</li>')
  });

  $('form').submit(function(){
    var message = $('#m').val();
    if (message != "") {
      socket.emit('chat', message, username);
      $('#m').val('');
      return false;
    }

    return false;
  });
});
