import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';
import { colors } from '../../styles/CommonStyles';

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/restaurants">맛집 커뮤니티</Logo>
        <NavLinks>
          {!token ? (
            <NavItem>
              <NavLink to="/">로그인</NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </NavItem>
          )}
          <NavItem>
            <NavLink to="/register">회원가입</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/posts">게시판</NavLink>
          </NavItem>
          <NavItem>
              <NavLink to="/profile">프로필</NavLink>
            </NavItem>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${colors.secondary};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: ${colors.dark};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${colors.dark};
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }
`;

export default Header;