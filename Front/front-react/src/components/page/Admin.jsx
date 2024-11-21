import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';
import { getAllUsers, getAllPosts, deleteUser, deletePostByAdmin } from '../../services/api';
import { colors } from '../../styles/CommonStyles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else {
      fetchPosts();
    }
  }, [activeTab, token]);

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers(token);
      setUsers(response.data);
    } catch (error) {
      if (error.response?.status === 403) {
        navigate('/');
        toast.error('관리자만 접근할 수 있습니다.');
      } else {
        toast.error('사용자 목록을 불러오는데 실패했습니다.');
      }
    }
  };

  // 게시물 목록 가져오기
  const fetchPosts = async () => {
    try {
      const response = await getAllPosts(token);
      setPosts(response.data);
    } catch (error) {
      toast.error('게시물 목록을 불러오는데 실패했습니다.');
    }
  };

  // 사용자 삭제
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(token, userId);
      fetchUsers();
      toast.success('사용자가 삭제되었습니다.');
    } catch (error) {
      toast.error('사용자 삭제에 실패했습니다.');
    }
  };

  // 게시물 삭제
  const handleDeletePost = async (postId) => {
    try {
        console.log(postId);
      await deletePostByAdmin(token, postId);
      fetchPosts();
      toast.success('게시물이 삭제되었습니다.');
    } catch (error) {
      toast.error('게시물 삭제에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Title>관리자 페이지</Title>
      <TabContainer>
        <Tab 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          사용자 관리
        </Tab>
        <Tab 
          active={activeTab === 'posts'} 
          onClick={() => setActiveTab('posts')}
        >
          게시물 관리
        </Tab>
      </TabContainer>

      {activeTab === 'users' ? (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>사용자명</Th>
                <Th>이메일</Th>
                <Th>가입일</Th>
                <Th>작업</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <DeleteButton onClick={() => handleDeleteUser(user._id)}>
                      삭제
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>제목</Th>
                <Th>작성자</Th>
                <Th>작성일</Th>
                <Th>작업</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <Td>{post._id}</Td>
                  <Td>{post.title}</Td>
                  <Td>{post.username}</Td>
                  <Td>{new Date(post.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <DeleteButton onClick={() => handleDeletePost(post._id)}>
                      삭제
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${colors.dark};
  margin-bottom: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? colors.primary : colors.gray}20;
  color: ${props => props.active ? 'white' : colors.dark};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.primary};
    color: white;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid ${colors.gray}30;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${colors.gray}20;
`;

const DeleteButton = styled.button`
  background: ${colors.danger};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default Admin; 