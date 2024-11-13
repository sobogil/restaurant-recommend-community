import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost, getComments, addComment } from '../../services/api'; // 필요한 API 가져오기

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getComments(postId); // 댓글 가져오기 API 호출
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      navigate('/posts'); // 삭제 후 게시물 목록 페이지로 이동
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment(postId, newComment); // 댓글 추가 API 호출
      setNewComment(''); // 댓글 추가 후 입력창 비우기
      const updatedComments = await getComments(postId); // 댓글 새로 불러오기
      setComments(updatedComments.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p>By: {post.username}</p>
      <p>{post.content}</p>
      {/* 유저가 게시글 작성자일 경우에만 삭제 버튼 보이기 */}
      {post.isOwner && (
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Post
        </button>
      )}

      <h3 className="mt-4">Comments</h3>
      <ul className="list-group">
        {comments.map((comment) => (
          <li key={comment._id} className="list-group-item">
            <p>{comment.text}</p>
            <small className="text-muted">By: {comment.username}</small>
          </li>
        ))}
      </ul>
      
      <div className="mt-3">
        <h5>Add a Comment</h5>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="form-control mb-2"
          rows="3"
        />
        <button onClick={handleAddComment} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
