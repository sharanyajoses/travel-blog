// This component contains a form that allows users to create new posts.  

import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState(null); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(UserContext); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = { title, content, author_id: user.id }; 

    try {
      const response = await fetch('http://localhost:3000/posts/api/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        },
        body: JSON.stringify(postData),
      });

      console.log('Full response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPostId(data.id); 
      setSuccessMessage('Post created successfully! You can view it');
      setErrorMessage('');
      console.log('Post created:', data);
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:<input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>
        <label>Content:<textarea value={content} onChange={e => setContent(e.target.value)} /></label>
        <button type="submit">Create Post</button>
      </form>
      {successMessage && (
        <div>
          <p>{successMessage} <Link to={`/posts/${postId}`}>here</Link>.</p>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default NewPost;
