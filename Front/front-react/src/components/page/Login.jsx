import React, { useState, useContext, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log('Login successful!');
      navigate('/welcome'); // 로그인 성공 시 환영 페이지로 이동
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'grey' }}>
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-3">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

