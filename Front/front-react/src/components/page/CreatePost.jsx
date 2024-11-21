// src/components/CreatePost.js
import React, { useState, useContext } from 'react';
import { createPost } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/CommonStyles';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(token, { title, content });
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container>
      <PostCard>
        <Title>새 글 작성</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>내용</Label>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows="10"
              required
            />
          </FormGroup>
          <ButtonGroup>
            <SubmitButton type="submit">작성하기</SubmitButton>
            <CancelButton type="button" onClick={() => navigate('/posts')}>
              취소
            </CancelButton>
          </ButtonGroup>
        </Form>
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

const Title = styled.h1`
  color: ${colors.dark};
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${colors.dark};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${colors.gray}30;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${colors.gray}30;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 200px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SubmitButton = styled(Button)`
  background: ${colors.primary};
  color: white;
  border: none;

  &:hover {
    background: ${colors.secondary};
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: ${colors.gray};
  border: 1px solid ${colors.gray}30;

  &:hover {
    background: ${colors.gray}10;
  }
`;

export default CreatePost;
