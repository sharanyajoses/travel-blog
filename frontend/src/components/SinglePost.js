// This component will display the details of a single post. It will fetch the post data from the server using the post ID from the URL params.
    

 import React, { useEffect, useState } from 'react';
 import { useParams } from 'react-router-dom';
 
 function SinglePost() {
   const { id } = useParams();
   const [post, setPost] = useState(null);
 
   useEffect(() => {
     const fetchPost = async () => {
       try {
         const response = await fetch(`http://localhost:3000/posts/api/${id}`);
         const data = await response.json();
         setPost(data);
       } catch (error) {
         console.error('Error fetching post:', error);
       }
     };
 
     fetchPost();
   }, [id]);
 
   if (!post) return <p>Loading...</p>;
 
   return (
     <div>
       <h1>{post.title}</h1>
       <p>{post.content}</p>
       <p>Author ID: {post.author_id}</p>
     </div>
   );
 }
 
 export default SinglePost;
 