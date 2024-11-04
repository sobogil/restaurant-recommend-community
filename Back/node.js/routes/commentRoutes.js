// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

// 댓글 작성 (인증 필요)
router.post('/:postId', authMiddleware, commentController.addComment);

// 특정 게시글의 댓글 목록 조회
router.get('/:postId', commentController.getComments);

// 댓글 삭제 (작성자만)
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
