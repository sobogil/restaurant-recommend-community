const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middleware/auth');

// 좋아요 추가
router.post('/', authMiddleware, likeController.addLike);

// 게시물의 좋아요 목록 조회
router.get('/:postId', likeController.getLikes);

// 좋아요 취소
router.delete('/:postId', authMiddleware, likeController.removeLike);

module.exports = router; 