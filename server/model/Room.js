const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoomSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Room', RoomSchema);
