module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var Message = new Schema({
    user: String,
    content: String,
    time_stamp: String
  })

  mongoose.model('Message', Message);

  // Initialize Mongoose
  var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/kokochat';

  mongoose.connect(uristring, function(err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
  });
};
