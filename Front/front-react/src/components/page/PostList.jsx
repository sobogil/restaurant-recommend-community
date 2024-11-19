import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';
import { Container, Title, Button, Input, colors } from '../../styles/CommonStyles';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // 기본 검색 타입은 제목
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const response = await getPosts(token);
        console.log('Posts fetched:', response.data);
        setPosts(response.data); // API에서 가져온 데이터 설정
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  // 검색 함수
  const handleSearch = () => {
    const filteredPosts = posts.filter((post) =>
      post[searchType]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  return (
    <Container>
      <Header>
        <Title>게시판</Title>
        <CreateButton 
          variant="primary" 
          onClick={() => navigate('/posts/create')}
        >
          새 글 작성
        </CreateButton>
      </Header>

      <SearchSection>
        <SearchSelect 
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="username">작성자</option>
        </SearchSelect>
        <SearchInput
          type="text"
          placeholder={`${searchType === 'title' ? '제목' : '작성자'}으로 검색`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton variant="primary" onClick={handleSearch}>
          검색
        </SearchButton>
      </SearchSection>

      <PostGrid>
        {posts.map((post) => (
          <PostCard 
            key={post._id}
            onClick={() => handlePostClick(post._id)}
          >
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>
              <Author>{post.username}</Author>
              <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
            </PostMeta>
          </PostCard>
        ))}
      </PostGrid>
    </Container>
  );
};

// Styled Components
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CreateButton = styled(Button)`
  padding: 0.75rem 1.5rem;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchSelect = styled.select`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${colors.gray}30;
  min-width: 120px;
`;

const SearchInput = styled(Input)`
  flex: 1;
`;

const SearchButton = styled(Button)`
  min-width: 100px;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
`;

const PostTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: ${colors.dark};
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.gray};
  font-size: 0.875rem;
`;

const Author = styled.span``;

const PostDate = styled.span``;

export default PostList;
