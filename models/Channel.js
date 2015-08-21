module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var Channel = new Schema({
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  })

  mongoose.model('Channel', Channel);
};
