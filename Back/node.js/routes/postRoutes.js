// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

// 게시글 작성 (인증 필요)
router.post('/', authMiddleware, postController.createPost);

// 전체 게시글 목록 조회
router.get('/', authMiddleware, postController.getPosts);

// 특정 게시글 조회
router.get('/:postId', postController.getPostById);

// 게시글 수정 (작성자만)
router.put('/:postId', authMiddleware, postController.updatePost);

// 게시글 삭제 (작성자만)
router.delete('/:postId', authMiddleware, postController.deletePost);

module.exports = router;
