import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../../services/api';
import styled from 'styled-components';
import { colors } from '../../styles/CommonStyles';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(token);
        setProfile({
          ...response.data,
          password: '',
          newPassword: ''
        });
      } catch (error) {
        toast.error('프로필을 불러오는데 실패했습니다.');
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(token, {
        username: profile.username,
        password: profile.password,
        newPassword: profile.newPassword || undefined
      });
      toast.success('프로필이 업데이트되었습니다.');
    } catch (error) {
      toast.error('프로필 업데이트에 실패했습니다.');
    }
  };

  return (
    <Container>
      <ProfileCard>
        <Title>프로필 설정</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>사용자명</Label>
            <Input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              value={profile.email}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="현재 비밀번호"
            />
          </FormGroup>
          <FormGroup>
            <Label>새 비밀번호 (선택사항)</Label>
            <Input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호"
            />
          </FormGroup>
          <SaveButton type="submit">저장</SaveButton>
        </Form>
      </ProfileCard>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${colors.dark};
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
  border: 1px solid ${colors.gray}40;
  border-radius: 8px;
  font-size: 1rem;

  &:disabled {
    background: ${colors.gray}20;
  }
`;

const SaveButton = styled.button`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export default Profile; 