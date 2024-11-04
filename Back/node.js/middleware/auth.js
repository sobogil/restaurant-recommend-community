const jwt = require('jsonwebtoken');

// 인증 미들웨어
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); // 요청 헤더에서 토큰 가져오기

  // 토큰이 없는 경우
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT 시크릿은 환경변수에 저장
    req.user = decoded.user; // 검증된 사용자 정보를 요청 객체에 추가
    next(); // 다음 미들웨어 또는 컨트롤러로 이동
  } catch (err) {
    console.error('Invalid token');
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
