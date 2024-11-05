import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts } from '../../services/api'; // API에서 게시물 목록 가져오는 함수

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data); // API에서 가져온 데이터 설정
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    console.log('Post clicked:', postId);
    navigate(`/posts/${postId}`); // 게시물 클릭 시 PostDetail 페이지로 이동
  };

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Posts</h2>
        <button className="btn btn-primary" onClick={() => navigate('/posts/create')}>
          Create Post
        </button>
      </div>
      <h2>Post List</h2>
      <ul className="list-group">
        {posts.map((post) => (
          <li 
            key={post._id} 
            className="list-group-item" 
            onClick={() => handlePostClick(post._id)} 
            style={{ cursor: 'pointer' }}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;