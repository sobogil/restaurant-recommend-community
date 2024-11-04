// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  restaurantName: { type: String},
  location: { type: String},
  rating: { type: Number, min: 0, max: 5 },
  images: [{ type: String }]
});

postSchema.set('timestamps', true);
module.exports = mongoose.model('Post', postSchema);
