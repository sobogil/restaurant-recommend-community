import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/CommonStyles';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <Title>404</Title>
        <Message>페이지를 찾을 수 없습니다</Message>
        <HomeButton onClick={() => navigate('/')}>
          홈으로 돌아가기
        </HomeButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: ${colors.primary};
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: ${colors.dark};
  margin: 1rem 0 2rem;
`;

const HomeButton = styled.button`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export default NotFound; 