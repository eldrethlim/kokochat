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

io.on('connection', function(socket){
  socket.emit('initialize', "Welcome to Kokochat!");

  socket.on('chat', function(msg){
    socket.emit('message', msg);
    socket.broadcast.emit('message', msg);
    console.log('message: ' + msg)
  });
});

http.listen(port, function(){
});
