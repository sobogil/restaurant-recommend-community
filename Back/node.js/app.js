require('dotenv').config(); // 환경변수 로드
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// 라우터 파일 가져오기
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const testRoutes = require('./routes/testRoutes');
const dbConnect = require('./config/dbConnect'); // dbConnect 가져오기
// Express 앱 생성
const app = express();

// 미들웨어 설정
app.use(cors());
app.use(morgan('dev')); // 로그 기록
app.use(bodyParser.json()); // JSON 파싱
dbConnect();


// 라우터 등록
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/test', testRoutes);

// 에러 핸들러 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 서버 시작
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
