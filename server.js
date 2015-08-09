// Initialize DB
require('./server/db') 

// Declarables
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var rootPath = __dirname;
var mongoose = require( 'mongoose' );
var Message = mongoose.model( 'Message' );

// Server PORT
process.env['PORT'] = process.env.PORT || 3000;
var port = process.env.PORT || 3000;


// Render SASS
app.use(sassMiddleware({
  src: path.join(rootPath, '/precompiled_assets'),
  dest: path.join(rootPath, '/assets'),
  debug: true,
  outputStyle: 'compressed'
  })
);


// Socket IO
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

// Fetch static assets
app.use(express.static(path.join(rootPath, '/assets')));

// Run jade template
app.set('view engine', 'jade');

// Fetch index template
app.get('/', function(req, res){
  res.render(rootPath + '/views/index.jade');
});


// Server listener
http.listen(port, function(){
});
