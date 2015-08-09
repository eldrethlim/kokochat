$(document).ready(function() {
  var getTimeStamp = function() {
    var today = new Date();
    var hour = today.getHours();
    var minutes = today.getMinutes();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var day = days[today.getDay()];
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var timeStamp = day + " " + hour + ":" + minutes;

    return timeStamp;
  };

  var scrollToBottom = function() {
    $('.container').scrollTop($('.container')[0].scrollHeight);
  }

  var socket = io();

  var username = prompt("Hi, what's your name?")

  if (username == "") {
    username = "Guest";
  };
  $('#m').focus();
  socket.emit('newUserJoins', username)

  socket.on('newUser', function(username) {
    $('#messages').append("<li class='new-user'>" + username + " has joined the channel.</li>")
  });

  socket.on('initialize', function(message) {
    $('#messages').append("<li class='welcome-message'>" + message + "</li>")
  });

  socket.on('fetchMessages', function(messages) {
    for (i = 0; i < messages.length; i++) {
      var chatTemplate =
        "<li>"
      + "<div class='username'>" + messages[i].user + " <span class='timestamp'>" + messages[i].time_stamp + "</span></div>"
      + "<div class='message'>" + messages[i].content + "</div>"
      + "</li>"

      $('#messages').append($(chatTemplate));
      scrollToBottom();
    }  
  });

  socket.on('message', function(data) {
    var chatTemplate =
      "<li>"
    + "<div class='username'>" + data.user + " <span class='timestamp'>" + data.time_stamp + "</span></div>"
    + "<div class='message'>" + data.content + "</div>"
    + "</li>"

    $('#messages').append($(chatTemplate));
    scrollToBottom();
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
