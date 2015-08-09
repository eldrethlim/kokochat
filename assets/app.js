$(document).ready(function() {
  var getTimeStamp = function() {
    var today = new Date();
    var hour = today.getHours();
    var minutes = today.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var timeStamp = hour + ":" + minutes;

    return timeStamp;
  };

  var socket = io();

  var username = prompt("Hi, what's your name?")

  if (username) {
    $('#m').focus();
    socket.emit('newUserJoins', username)
  };

  socket.on('newUser', function(username) {
    $('#messages').append("<li class='new-user'>" + username + " has joined the channel.</li>")
  });

  socket.on('initialize', function(message) {
    $('#messages').append("<li class='welcome-message'>" + message + "</li>")
  });

  socket.on('message', function(data) {
    var chatTemplate =
      "<li>"
    + "<div class='username'>" + data.username + " <span class='timestamp'>" + data.timeStamp + "</span></div>"
    + "<div class='message'>" + data.message + "</div>"
    + "</li>"

    $('#messages').append($(chatTemplate));
  });

  $('form').submit(function(){
    var message = $('#m').val();
    if (message != "") {

      var timeStamp = getTimeStamp();
      var data = {
        message: message,
        username: username,
        timeStamp: timeStamp
      };

      socket.emit('chat', data);
      $('#m').val('');
      return false;
    }

    return false;
  });
});
