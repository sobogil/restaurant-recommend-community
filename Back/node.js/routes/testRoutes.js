//testroute만들어줘
//testRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const authMiddleware = require('../middleware/auth');

// test모델을 이용해서 get,post방식을 구현하고 db에 테스트하는 라우터
router.get('/', testController.getTest);
router.post('/', testController.postTest);

module.exports = router;