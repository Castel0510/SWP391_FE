import React, { useState } from 'react';
import '../Service/service.scss';
import ItemGallery from './ItemGallery';

const mapCategoryToNumber = (category) => {
  const categoryMap = {
    'Boarding': 0,
    'Grooming': 1,
    'Healcare': 2,
  };
  return categoryMap[category];
};

const CategoryFilter = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    const categoryNumber = mapCategoryToNumber(category);
    if (category === selectedCategory) {
      setSelectedCategory(null);
      onCategoryChange(null);
    } else {
      setSelectedCategory(category);
      onCategoryChange(categoryNumber);
    }
  };
  

  return (
    <div>
      <div className="flex flex-row">
        <button
          onClick={() => handleCategoryClick('Boarding')}
          className={`category-button ${selectedCategory === 'Boarding' ? 'active' : ''}`}
        >
          Boarding
        </button>
        <button
          onClick={() => handleCategoryClick('Grooming')}
          className={`category-button ${selectedCategory === 'Grooming' ? 'active' : ''}`}
        >
          Grooming
        </button>
        <button
          onClick={() => handleCategoryClick('Healcare')}
          className={`category-button ${selectedCategory === 'Healcare' ? 'active' : ''}`}
        >
          Healthcare
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
