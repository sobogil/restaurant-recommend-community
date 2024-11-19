import React, { useState, useEffect, useContext } from 'react';
import { addLike, removeLike, getLikes } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export const LikeButton = ({ postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    fetchLikes();
  }, [postId]);

  const fetchLikes = async () => {
    try {
      const response = await getLikes(postId);
      setLikeCount(response.data.count);
      setIsLiked(response.data.likes.some(like => like.userId === user?.id));
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    if (!token) {
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
        console.log("hi");
        await addLike(token, postId);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
        toast.success('좋아요를 눌렀습니다.');
      }
    } catch (error) {
      toast.error('작업 중 오류가 발생했습니다.');
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