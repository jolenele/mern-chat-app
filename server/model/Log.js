const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Log = new Schema(
  {
    type: String,
    source: String,
    user: String,
    room: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Log', Log);
