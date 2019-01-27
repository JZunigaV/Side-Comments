const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  sectionId: String,
  comment: String,
  authorAvatarUrl: String,
  authorName: String,
  authorId: String,
  authorUrl: String,
  id: String
});

const Comment = mongoose.model("Model", commentSchema);
module.exports = Comment;
