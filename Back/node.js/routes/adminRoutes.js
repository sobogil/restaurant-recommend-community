const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// 모든 관리자 라우트에 인증 미들웨어와 관리자 권한 체크 미들웨어 적용
router.use(authMiddleware);
router.use(adminController.checkAdminRole);

// 관리자 라우트
router.get('/users', adminController.getAllUsers);
router.get('/posts', adminController.getAllPosts);
router.delete('/users/:userId', adminController.deleteUser);
router.delete('/posts/:postId', adminController.deletePost);

module.exports = router;