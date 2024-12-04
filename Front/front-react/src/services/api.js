// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 사용자 API
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const getUserProfile = (token) => api.get('/users/profile', {
  headers: { Authorization: token },
});
export const updateUserProfile = (token, userData) => api.put('/users/profile', userData, {
  headers: { Authorization: token },
});

// 게시물 API
export const createPost = (token, postData) => api.post('/posts', postData, {
  headers: { Authorization: token },
});
export const getPosts = (token) => api.get('/posts', {
  headers: { Authorization: token },
});
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const updatePost = (token, postId, postData) => api.put(`/posts/${postId}`, postData, {
  headers: { Authorization: token },
});
export const deletePost = (token, postId) => api.delete(`/posts/${postId}`, {
  headers: { Authorization: token },
});

// 댓글 API
export const addComment = (token, postId, newComment) => api.post(`/comments/${postId}`, newComment, {
  headers: { Authorization: token },
});
export const getComments = (postId) => api.get(`/comments/${postId}`);
export const deleteComment = (token, commentId) => api.delete(`/comments/${commentId}`, {
  headers: { Authorization: token },
});

// 즐겨찾기 API
export const addFavorite = (token, favoriteData) => api.post('/favorites', favoriteData, {
  headers: { Authorization: token },
});
export const getFavorites = (token) => api.get('/favorites', {
  headers: { Authorization: token },
});
export const removeFavorite = (token, restaurantId) => api.delete(`/favorites/${restaurantId}`, {
  headers: { Authorization: token },
});

// 좋아요 API
export const addLike = (token, postId) => api.post('/likes', { postId }, {
  headers: { Authorization: token },
});

export const getLikes = (postId) => api.get(`/likes/${postId}`);

export const removeLike = (token, postId) => api.delete(`/likes/${postId}`, {
  headers: { Authorization: token },
});

//네이버 레스토랑 정보 가져오는 api
export const fetchRestaurants = (query) => api.get(`/restaurants?q=${query}`);

// 관리자 API
export const getAllUsers = (token) => api.get('/admin/users', {
  headers: { Authorization: token }
});

export const getAllPosts = (token) => api.get('/admin/posts', {
  headers: { Authorization: token }
});

export const deleteUser = (token, userId) => api.delete(`/admin/users/${userId}`, {
  headers: { Authorization: token }
});

export const deletePostByAdmin = (token, postId) => api.delete(`/admin/posts/${postId}`, {
  headers: { Authorization: token },
});
