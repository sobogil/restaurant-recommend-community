// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // 서버의 URL을 적절하게 조정하세요

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
export const getPosts = () => api.get('/posts');
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const updatePost = (token, postId, postData) => api.put(`/posts/${postId}`, postData, {
  headers: { Authorization: token },
});
export const deletePost = (token, postId) => api.delete(`/posts/${postId}`, {
  headers: { Authorization: token },
});

// 댓글 API
export const addComment = (token, postId, commentData) => api.post(`/comments/${postId}`, commentData, {
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