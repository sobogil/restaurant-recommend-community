// src/components/Posts/PostList.js
import React, { useEffect, useState } from 'react';
import { getPosts } from '../../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.postId}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>식당: {post.restaurantName} - 위치: {post.location}</p>
          <p>평점: {post.rating}</p>
          <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
          {/* 댓글 목록 컴포넌트와 연결 */}
        </div>
      ))}
    </div>
  );
};

export default PostList;
