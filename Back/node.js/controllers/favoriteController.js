// controllers/favoriteController.js
const Favorite = require('../models/Favorite');

// 즐겨찾기 추가
exports.addFavorite = async (req, res) => {
  try {
    const { restaurantId, restaurantName, location } = req.body;
    const newFavorite = new Favorite({ userId: req.userId, restaurantId, restaurantName, location });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding favorite' });
  }
};

// 즐겨찾기 목록 조회
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
};

// 즐겨찾기 삭제
exports.removeFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ userId: req.userId, restaurantId: req.params.restaurantId });
    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing favorite' });
  }
};
