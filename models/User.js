module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var passportLocalMongoose = require('passport-local-mongoose');
  var User = new Schema({
    email: String,
    name: String,
    password: String,
  })

  User.plugin(passportLocalMongoose);
  mongoose.model('User', User);
};
