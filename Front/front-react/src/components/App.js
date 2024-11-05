import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../context/AuthContext'; // AuthProvider import
import Login from './page/Login'; // Login 컴포넌트 import
import Welcome from './page/Welcome'; // Welcome 컴포넌트 import
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import Header from './page/Header';
import Register from './page/Register';
import PostList from './page/PostList';
import CreatePost from './page/CreatePost';
import PostDetail from './page/PostDetail';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header /> {/* Header 컴포넌트를 렌더링 */}
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/posts/:postId" element={<PostDetail />} />
                <Route path="/posts/create" element={<CreatePost />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// 로그인 상태에 따라 접근을 제어하는 PrivateRoute 컴포넌트
function PrivateRoute({ children }) {
  const { token } = React.useContext(AuthContext); // AuthContext에서 user 가져오기

  return token ? children : <Navigate to="/" />; // 로그인 되어있으면 자식 컴포넌트 렌더링, 아니면 로그인 페이지로 리디렉션
}

export default App;