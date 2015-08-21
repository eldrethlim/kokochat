var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/chat', function(req, res) {
  res.render('chat');
});

router.get('/register', function(req, res) {
  res.render('register');
});

// router.post('/register', function(req, res) {
//   if(!req.body.phone_number){
//     return res.status(400).json({message: 'Please enter your phone number to sign up.'});
//   };
// });

module.exports = router;
