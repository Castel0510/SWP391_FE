import React, { useState } from 'react';
import '../Service/service.scss'
import ItemGallery from './ItemGallery';

const CategoryFilter = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState("Default"); 

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    return (
        <div>
            <div className="flex flex-col">        
                    
                <button
                    onClick={() => handleCategoryClick('Hotel')}
                    className={`category-button ${
                        selectedCategory === 'Hotel' ? 'active' : ''
                    }`}
                >
                    Hotel
                </button>
                <button
                    onClick={() => handleCategoryClick('Spa')}
                    className={`category-button ${
                        selectedCategory === 'Spa' ? 'active' : ''
                    }`}
                >
                    Spa
                </button>
                <button
                    onClick={() => handleCategoryClick('Medical')}
                    className={`category-button ${
                        selectedCategory === 'Medical' ? 'active' : ''
                    }`}
                >
                    Medical
                </button>
                <button
                    onClick={() => handleCategoryClick('Cage')}
                    className={`category-button ${
                        selectedCategory === 'Cage' ? 'active' : ''
                    }`}
                >
                    Cage
                </button>
            </div>
        </div>
    );
};

export default CategoryFilter;
