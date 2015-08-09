// Declarables
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var rootPath = __dirname;
var mongoose = require('mongoose');

require('./server/db')(mongoose)
require('./server/chat')(http, mongoose)

// Server PORT
process.env['PORT'] = process.env.PORT || 3000;
var port = process.env.PORT || 3000;

// Render SASS
app.use(sassMiddleware({
  src: path.join(rootPath, '/precompiled_assets'),
  dest: path.join(rootPath, '/client/assets'),
  debug: true,
  outputStyle: 'compressed'
  })
);

// Fetch static assets
app.use(express.static(path.join(rootPath, '/client/assets')));

// Run jade template
app.set('views', path.join(rootPath, '/client/views'));
app.set('view engine', 'jade');

// Routes
var index = require('./routes/index.js')

app.use('/', index);

// Server listener
http.listen(port, function(){
});
