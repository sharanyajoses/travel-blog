//  This component contains a navigation bar with links to the home page, posts page, create post page, login page, and register page.

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; 
import '../styles/styles.css';

function Header() {
  const { user, setUser } = useContext(UserContext); 
  const handleLogout = () => {
    
    setUser(null); 
  };

 

  return (
    <header>
      <nav className="navbar">
        <ul className="navList">
          <li className="navItem"><Link to="/">Home</Link></li>
          <li className="navItem"><Link to="/posts">Posts</Link></li>
          {user ? (
            <>
              <li className="navItem"><Link to="/create-post">Create Post</Link></li>
              <li className="navItem"><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li className="navItem"><Link to="/login">Login</Link></li>
              <li className="navItem"><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

