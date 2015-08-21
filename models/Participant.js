module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var Participant = new Schema({
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  })

  mongoose.model('Participant', Participant);
};
