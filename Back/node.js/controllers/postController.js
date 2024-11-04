// controllers/postController.js
const Post = require('../models/Post');

// 게시글 작성
exports.createPost = async (req, res) => {
  try {
    const { title, content, restaurantName, location, rating, images } = req.body;
    const newPost = new Post({ authorId: req.userId, title, content, restaurantName, location, rating, images });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

// 전체 게시글 목록 조회
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// 특정 게시글 조회
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.authorId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });
    Object.assign(post, req.body);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.authorId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });
    await post.remove();
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};

