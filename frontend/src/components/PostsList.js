// This component fetches a list of posts from the server and displays them on the page. 
import React, { useEffect, useState } from 'react';

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts/api/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        
                    </div>
                ))
            )}
        </div>
    );
}

export default PostsList;
