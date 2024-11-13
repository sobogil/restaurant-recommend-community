import React, { useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/restaurants'}>
          main
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            {!token ? (
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posts">게시판</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;