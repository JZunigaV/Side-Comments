const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  //id: String, //not needed, mongoose will automatically add an "_id" property when you save
  authorAvatarUrl: String,
  authorName: String,
  authorId: String,
  authorUrl: String,
  comment: String,
  parentId: String
});



const commentSchema = new Schema({
  //id: String, //not needed, mongoose will automatically add an "_id" property when you save
  authorAvatarUrl: String,
  authorName: String,
  authorId: String,
  authorUrl: String,
  comment: String,
  replies: {
    type: [replySchema]
  }
});



//Section includes all other schemas
const sectionSchema = new Schema({
  sectionId: {
    type: String
  },
  comments: {
    type: [commentSchema]
  }
});

module.exports = mongoose.model("Section", sectionSchema);
