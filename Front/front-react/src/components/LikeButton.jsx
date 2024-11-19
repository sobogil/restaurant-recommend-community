import React, { useState, useEffect, useContext } from 'react';
import { addLike, removeLike, getLikes } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export const LikeButton = ({ postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { token, user } = useContext(AuthContext);

  const fetchLikes = async () => {
    try {
      const response = await getLikes(postId);
      setLikeCount(response.data.count);
      console.log("response.data.likes", response.data.likes[0].userId);
      console.log("user", user);
      if (user.userId == response.data.likes[0].userId) {
        console.log("user", user);
        const userLike = response.data.likes.find(like => like.userId === user.userId);
        setIsLiked(!!userLike);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  useEffect(() => {
    if (token && user && postId) {
      fetchLikes();
    }
  }, [postId, token, user]);

  const handleLike = async () => {
    if (!token || !user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      if (isLiked) {
        await removeLike(token, postId);
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
        toast.success('좋아요를 취소했습니다.');
      } else {
        await addLike(token, postId);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
        toast.success('좋아요를 눌렀습니다.');
      }
    } catch (error) {
      console.error('Like error:', error);
      toast.error('작업 중 오류가 발생했습니다.');
      fetchLikes();
    }
  };

  return (
    <LikeButtonContainer>
      <HeartButton onClick={handleLike} isLiked={isLiked}>
        {isLiked ? '❤️' : '🤍'}
      </HeartButton>
      <LikeCount>{likeCount}</LikeCount>
    </LikeButtonContainer>
  );
};

const LikeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
  color: ${props => props.$isLiked ? 'inherit' : 'inherit'};

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LikeCount = styled.span`
  font-size: 1rem;
  color: #666;
  font-weight: bold;
`;

//export default LikeButton; 