import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/welcome'}>
          main
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={'/'}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/register'}>
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/posts'}>
                게시판
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
