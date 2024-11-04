// routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/auth');

// 맛집 즐겨찾기 추가 (인증 필요)
router.post('/', authMiddleware, favoriteController.addFavorite);

// 사용자의 즐겨찾기 목록 조회
router.get('/', authMiddleware, favoriteController.getFavorites);

// 즐겨찾기 삭제
router.delete('/:restaurantId', authMiddleware, favoriteController.removeFavorite);

module.exports = router;
