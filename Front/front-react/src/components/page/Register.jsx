import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';
import { colors } from '../../styles/CommonStyles';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterTitle>회원가입</RegisterTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>사용자 이름</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="사용자 이름"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </FormGroup>
          <SubmitButton type="submit">회원가입</SubmitButton>
        </Form>
      </RegisterCard>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
  padding: 2rem;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const RegisterTitle = styled.h1`
  text-align: center;
  color: ${colors.dark};
  font-size: 2rem;
  margin-bottom: 2rem;
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
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

const SubmitButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.secondary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default Register;


