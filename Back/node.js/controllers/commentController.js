// controllers/commentController.js
const Comment = require('../models/Comment');

// 댓글 작성
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = new Comment({ postId: req.params.postId, authorId: req.userId, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};

// 댓글 조회
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.authorId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });
    await comment.remove();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
