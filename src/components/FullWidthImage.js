import React from 'react';
import './FullWidthImage.css';

const FullWidthImage = () => {
  const culture = `${process.env.PUBLIC_URL}/images/heroimages/culture.png`;

  return (
    <div className="full-width-image-container">
      <img src={culture} alt="Culture" className="full-width-image" loading="lazy" />
    </div>
  );
};

export default FullWidthImage;
