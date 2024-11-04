// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentId: { type: String, required: true, unique: true },
  postId: { type: mongoose.Schema.Types.String, ref: 'Post', required: true },
  userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  content: { type: String, required: true }
});

commentSchema.set('timestamps', true);
module.exports = mongoose.model('Comment', commentSchema);
