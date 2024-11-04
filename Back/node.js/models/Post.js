// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true },
  authorId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  restaurantName: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
