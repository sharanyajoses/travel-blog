
// This omponent is the main component of the application.


import React from 'react';
import Banner from './Banner';
import '../styles/styles.css'; // Import global styles

function Home() {
  return (
    <div className="home-container">
      <Banner />
      
      <div className="home-content">
        <h1>About us</h1>
        <p>We are thrilled to welcome you to our family travel blog. We're a family of three. We’ve embarked on a journey across Europe, exploring its stunning landscapes, rich history, and vibrant cultures.Join us as we navigate the joys and challenges of family travel, one European city at a time. </p>
      </div>
    </div>
  );
}

export default Home;

