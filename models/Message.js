module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var Message = new Schema({
    user: String,
    content: String,
    time_stamp: String
  })

  mongoose.model('Message', Message);
};
