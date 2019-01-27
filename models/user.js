const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  avatarUrl: String,
  name: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
