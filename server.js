// Declarables
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var rootPath = __dirname;
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

// Server port
process.env['PORT'] = process.env.PORT || 3000;
var port = process.env.PORT || 3000;

// Models
require('./models/Message')(mongoose)
require('./models/User')(mongoose)

// Authentication
var User = mongoose.model( 'User' );
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
// app.use(function(req, res, next) {

//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// Services
require('./services/db')(mongoose)
require('./services/chat')(http, mongoose)

// SASS
app.use(sassMiddleware({
  src: path.join(rootPath, '/precompiled_assets'),
  dest: path.join(rootPath, '/client/assets'),
  debug: true,
  outputStyle: 'compressed'
  })
);

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
