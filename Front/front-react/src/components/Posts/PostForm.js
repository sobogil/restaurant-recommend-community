// src/components/Posts/PostForm.js
import React, { useContext, useState } from 'react';
import { createPost } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const PostForm = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content, restaurantName, location, rating: Number(rating), images };
    await createPost(token, postData);
    // 추가 후 필요한 로직 처리 (예: 리다이렉트, 상태 초기화 등)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" required />
      <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} placeholder="식당 이름" required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="식당 위치" required />
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="평점" required />
      <input type="text" value={images} onChange={(e) => setImages(e.target.value.split(','))} placeholder="이미지 URL (쉼표로 구분)" />
      <button type="submit">게시물 작성</button>
    </form>
  );
};

export default PostForm;
