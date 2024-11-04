// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// 회원가입
router.post('/register', userController.registerUser);

// 로그인
router.post('/login', userController.loginUser);

// 사용자 프로필 조회 (인증 필요)
router.get('/profile', authMiddleware, userController.getUserProfile);

// 사용자 프로필 업데이트 (인증 필요)
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
