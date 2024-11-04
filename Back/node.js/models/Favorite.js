// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  restaurantId: { type: String, required: true },
  restaurantName: { type: String, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
