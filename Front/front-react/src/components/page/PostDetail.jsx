import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost, getComments, addComment } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { LikeButton } from '../LikeButton';
import styled from 'styled-components';
import { colors } from '../../styles/CommonStyles';
import { toast } from 'react-toastify';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
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
      if (!newComment.trim()) return;

      const response = await addComment(token, postId, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <PostCard>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <AuthorInfo>작성자: {post.username}</AuthorInfo>
        </PostHeader>
        
        <Content>{post.content}</Content>
        
        <ActionSection>
          <LikeButton postId={postId} />
          {post.isOwner && (
            <DeleteButton onClick={handleDelete}>
              삭제하기
            </DeleteButton>
          )}
        </ActionSection>

        <CommentSection>
          <SectionTitle>댓글</SectionTitle>
          <CommentList>
            {comments.map((comment) => (
              <CommentCard key={comment._id}>
                <CommentContent>{comment.content}</CommentContent>
                <CommentAuthor>작성자: {comment._id}</CommentAuthor>
              </CommentCard>
            ))}
          </CommentList>
          
          <AddCommentSection>
            <SectionTitle>댓글 작성</SectionTitle>
            <CommentTextarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              rows="3"
            />
            <SubmitButton onClick={handleAddComment}>
              댓글 작성
            </SubmitButton>
          </AddCommentSection>
        </CommentSection>
      </PostCard>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
`;

const PostTitle = styled.h1`
  color: ${colors.dark};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const AuthorInfo = styled.p`
  color: ${colors.gray};
  font-size: 0.9rem;
`;

const Content = styled.div`
  color: ${colors.dark};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${colors.gray}30;
`;

const DeleteButton = styled.button`
  background: ${colors.danger};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${colors.dark};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CommentCard = styled.div`
  background: ${colors.light};
  padding: 1rem;
  border-radius: 8px;
`;

const CommentContent = styled.p`
  margin: 0;
  color: ${colors.dark};
`;

const CommentAuthor = styled.small`
  color: ${colors.gray};
  display: block;
  margin-top: 0.5rem;
`;

const AddCommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray}30;
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

const SubmitButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.secondary};
  }
`;

export default PostDetail;
