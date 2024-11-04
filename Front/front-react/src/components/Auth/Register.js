// src/components/Auth/Register.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="사용자 이름" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Register;
