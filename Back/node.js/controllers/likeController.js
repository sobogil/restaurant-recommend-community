const Like = require('../models/Like');

// 좋아요 추가
exports.addLike = async (req, res) => {
  try {
    console.log(req.userId);
    const { postId } = req.body;
    const newLike = await Like.create({ 
      userId: req.userId, 
      postId 
    });
    res.status(201).json(newLike);
  } catch (error) {
    if (error.code === 11000) { // 중복 좋아요 시도
      return res.status(400).json({ error: 'Already liked this post' });
    }
    res.status(500).json({ error: 'Error adding like' });
  }
};

// 게시물의 좋아요 수 조회
exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId });
    res.status(200).json({ count: likes.length, likes });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching likes' });
  }
};

// 좋아요 취소
exports.removeLike = async (req, res) => {
  try {
    await Like.findOneAndDelete({ 
      userId: req.userId, 
      postId: req.params.postId 
    });
    res.status(200).json({ message: 'Like removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing like' });
  }
}; 