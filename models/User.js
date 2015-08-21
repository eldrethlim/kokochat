module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var passportLocalMongoose = require('passport-local-mongoose');
  var User = new Schema({
    phone_number: String,
    name: String,
  })

  User.plugin(passportLocalMongoose);
  mongoose.model('User', User);
};
