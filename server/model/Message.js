const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
  content: {
    type: String,
    required: [true, 'message sender is required'],
  },
  sender: {
    type: String,
    required: [true, 'message sender is required'],
  },
  room: {
    type: String,
    required: [true, 'message room is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
