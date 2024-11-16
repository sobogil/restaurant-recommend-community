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
import RestaurantList from './page/RestaurantList';
import PrivateRoute from './Auth/PrivateRoute';



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
                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/posts" element={<PrivateRoute><PostList /></PrivateRoute>} />
                <Route path="/posts/:postId" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
                <Route path="/posts/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// 로그인 상태에 따라 접근을 제어하는 PrivateRoute 컴포넌트
export default App;