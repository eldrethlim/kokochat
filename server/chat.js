module.exports = function(http, mongoose) {
  
  var io = require('socket.io')(http);
  var Message = mongoose.model( 'Message' );

  io.on('connection', function(socket) {
    
    // Fetch all messages
    Message.find(function(error, messages) {
      if (error) {
        return console.error(error);
      }

      socket.emit('fetchMessages', messages);
    });

    socket.emit('initialize', "Welcome to Kokochat!");
    
    socket.on('newUserJoins', function(username) {
      socket.broadcast.emit('newUser', username)
    });

    socket.on('chat', function(data) {
      var message = new Message({ user: data.username, content: data.message, time_stamp: data.timeStamp });
      message.save(function(error, message) {
        if (error) {
          return console.error(error);
        }
        socket.emit('message', message);
        socket.broadcast.emit('message', message);
      })
    });
  });
};
