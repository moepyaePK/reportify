// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddPost from './pages/addpost';
import LoginPage from './pages/login';
import SignUpPage  from './pages/signup';
import User from './pages/user';
import PostHistory from './pages/posthistory';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage  />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/user" element={<User />} />
        <Route path="/posthistory" element={<PostHistory />} />

       

      </Routes>
    </Router>
  );
}

export default App;
