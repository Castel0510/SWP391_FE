import React, { useState } from 'react';

const Rating = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    onRate(index);
  };

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < (hoverRating || rating) ? 'filled' : ''}`}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          
        </span>
      ))}
    </div>
  );
};

export default Rating;
