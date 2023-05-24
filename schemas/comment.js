const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    _postId: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true, 
      },
      content: {
        type: String,
      },
      createdAt: {
        type: Date,
      }
});

module.exports = mongoose.model("comment", commentSchema);