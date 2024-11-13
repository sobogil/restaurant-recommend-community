import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts } from '../../services/api'; // API에서 게시물 목록 가져오는 함수
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // 기본 검색 타입은 제목
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const response = await getPosts(token);
        console.log('Posts fetched:', response.data);
        setPosts(response.data); // API에서 가져온 데이터 설정
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  // 검색 함수
  const handleSearch = () => {
    const filteredPosts = posts.filter((post) =>
      post[searchType]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(filteredPosts);
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
      <ul className="list-group mb-4">
        {posts.map((post) => (
          <li
            key={post._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => handlePostClick(post._id)}
            style={{ cursor: 'pointer' }}
          >
            <span>{post.title}</span>
            <span className="text-muted">{post.userId}</span>
          </li>
        ))}
      </ul>
      <div className="search-bar mt-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="form-select mb-2"
        >
          <option value="title">Title</option>
          <option value="username">User Name</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={handleSearch} className="btn btn-secondary w-100">
          Search
        </button>
      </div>
    </div>
  );
};

export default PostList;
