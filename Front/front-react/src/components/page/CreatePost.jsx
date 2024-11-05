// src/components/CreatePost.js
import React, { useState, useContext } from 'react';
import { createPost } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(token, { title, content });
      console.log('Post created successfully!');
      navigate('/posts'); // Redirect to PostList after successful creation
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
