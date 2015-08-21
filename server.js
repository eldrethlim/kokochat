// Declarables
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var rootPath = __dirname;
var stylus = require('stylus');
var nib = require('nib');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

// Server port
process.env['PORT'] = process.env.PORT || 3000;
var port = process.env.PORT || 3000;

// Models
require('./models/User')(mongoose)
require('./models/Participant')(mongoose)
require('./models/Channel')(mongoose)
require('./models/Message')(mongoose)

// Authentication
var User = mongoose.model('User');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Services
require('./services/db')(mongoose)
require('./services/chat')(http, mongoose)

// Stylus Middleware
var compile = function(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
    .import('nib');
};

app.use(stylus.middleware({
  src: path.join(rootPath, '/precompiled_assets/css'),
  dest: path.join(rootPath, '/client/assets/css'),
  compile: compile
}))


// Assets and views
app.use(express.static(path.join(rootPath, '/client/assets')));
app.set('views', path.join(rootPath, '/client/views'));
app.set('view engine', 'jade');

// Routes
var routes = require('./routes.js')
app.use('/', routes);

// Server listener
http.listen(port, function(){

});
