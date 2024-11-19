require('dotenv').config(); // 환경변수 로드
const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// 라우터 파일 가져오기
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const testRoutes = require('./routes/testRoutes');
const dbConnect = require('./config/dbConnect'); // dbConnect 가져오기
// Express 앱 생성
const app = express();

// 미들웨어 설정
app.use(cors());
app.use(morgan('dev')); // 로그 기록
app.use(bodyParser.json()); // JSON 파싱
app.use(express.json()); // JSON 파싱
dbConnect();


// 라우터 등록
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/test', testRoutes);

// 에러 핸들러 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

//네이버 api
app.get('/api/restaurants', async (req, res) => {
  const query = req.query.q || 'restaurant'; // 쿼리 파라미터 기본값 설정
  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/local.json', {
      params: {
        query: query,
        display: 10, // 최대 10개의 결과 표시
      },
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Naver API:', error);
    res.status(500).send('Error fetching data from Naver API');
  }
});

// 서버 시작
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
