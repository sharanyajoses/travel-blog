// This component displays a banner image.

import React from 'react';
import bannerImage from '../assets/images/banner_image.jpg';

function Banner() {
  return (
    <div className="banner-container">
      <img src={bannerImage} alt="Banner" className="banner-image" />
      <div className="banner-text">
        <h1>Welcome to Our European Travel Adventures!</h1>
        <p>We hope our stories inspire you to create unforgettable memories with your family.</p>
      </div>
    </div>
  );
}

export default Banner;

