
//App.js file

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import PostsList from './components/PostsList';
import SinglePost from './components/SinglePost';
import Header from './components/Header'; 
import Footer from './components/Footer';
import './styles/styles.css'; 
function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/create-post" element={<NewPost />} />
          </Routes>
        </div>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;

