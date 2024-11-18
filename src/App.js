// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddPost from './pages/addpost';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import User from './pages/user';
import PostHistory from './pages/posthistory';
import Preview from './pages/preview';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Main App Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/user" element={<User />} />
        <Route path="/posthistory" element={<PostHistory />} />
        <Route path="/" element={<Preview />} />
        
        {/* Catch-All for Undefined Routes */}
      </Routes>
    </Router>
  );
}

export default App;
