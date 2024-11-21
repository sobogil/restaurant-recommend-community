const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// 모든 사용자 조회
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')  // 비밀번호 필드 제외
      .sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: '사용자 목록을 가져오는데 실패했습니다.' });
  }
};

// 모든 게시물 조회
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: '게시물 목록을 가져오는데 실패했습니다.' });
  }
};

// 사용자 삭제
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // 사용자와 관련된 모든 데이터 삭제
    await Promise.all([
      User.findByIdAndDelete(userId),
      Post.deleteMany({ userId }),
      Comment.deleteMany({ userId })
    ]);

    res.status(200).json({ message: '사용자가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '사용자 삭제에 실패했습니다.' });
  }
};

// 게시물 삭제
exports.deletePost = async (req, res) => {
  try {
    console.log('req.params.postId:', req.params.postId);
    const postId = req.params.postId;
    
    // 게시물과 관련된 모든 댓글 삭제
    await Promise.all([
      Post.findByIdAndDelete(postId),
      Comment.deleteMany({ postId })
    ]);

    res.status(200).json({ message: '게시물이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '게시물 삭제에 실패했습니다.' });
  }
};

// 관리자 권한 확인 미들웨어
exports.checkAdminRole = async (req, res, next) => {
  try {
    console.log('req.userId:', req.userId);
    const user = await User.findById(req.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: '관리자 권한이 없습니다.' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: '권한 확인에 실패했습니다.' });
  }
};