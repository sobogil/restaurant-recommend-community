// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 회원가입
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// 로그인 및 JWT 발급
exports.loginUser = async (req, res) => {
  try {
    console.log('Request body:', req.body); // 요청 바디 확인
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // 사용자 존재 여부와 비밀번호 확인
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // MongoDB의 _id를 사용하여 JWT 생성
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('User found:', user); // 사용자 정보 확인
    console.log('Generated Token:', token); // 생성된 토큰 출력

    // 토큰을 클라이언트에 반환
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
// 사용자 프로필 조회
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// 사용자 프로필 업데이트
exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};
