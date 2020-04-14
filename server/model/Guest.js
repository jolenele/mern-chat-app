const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Guest = new Schema({
  name: {
    type: String,
    required: true,
  },
  joined_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Guest', Guest);
