var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Start Server
process.env['PORT'] = process.env.PORT || 3000;
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/assets', express.static(__dirname + '/assets'));

io.on('connection', function(socket) {
  socket.emit('initialize', "Welcome to Kokochat!");

  socket.on('newUserJoins', function(username) {
    socket.broadcast.emit('newUser', username)
  });

  socket.on('chat', function(data) {
    socket.emit('message', data);
    socket.broadcast.emit('message', data);
  });
});

http.listen(port, function(){
});
