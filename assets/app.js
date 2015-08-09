$(document).ready(function() {
  var socket = io.connect('http://localhost:3000');

  socket.on('initialize', function(message) {
    $('#messages').append('<li>' + message + '</li>')
  });

  socket.on('message', function(message) {
    $('#messages').append('<li>' + message + '</li>')
  });

  $('form').submit(function(){
    var message = $('#m').val();
    if (message != "") {
      socket.emit('chat', message);
      $('#m').val('');
      return false;
    }

    return false;
  });
});
