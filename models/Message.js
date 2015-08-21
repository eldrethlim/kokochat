module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var Message = new Schema({
    content: String,
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  })

  mongoose.model('Message', Message);
};
