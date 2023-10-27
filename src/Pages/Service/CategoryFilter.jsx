import React, { useState } from 'react';
import '../Service/service.scss';
import ItemGallery from './ItemGallery';

const CategoryFilter = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState("Default");

    const handleCategoryClick = (category) => {
        if (category === selectedCategory) {
            setSelectedCategory("Default");
            onCategoryChange(null);
        } else {
            setSelectedCategory(category);
            onCategoryChange(category);
        }
    };

    return (
        <div>
            <div className="flex flex-row">
                <button
                    onClick={() => handleCategoryClick('Hotel')}
                    className={`category-button ${selectedCategory === 'Hotel' ? 'active' : ''}`}
                >
                    Boarding
                </button>
                <button
                    onClick={() => handleCategoryClick('Spa')}
                    className={`category-button ${selectedCategory === 'Spa' ? 'active' : ''}`}
                >
                    Grooming
                </button>
                <button
                    onClick={() => handleCategoryClick('Medical')}
                    className={`category-button ${selectedCategory === 'Medical' ? 'active' : ''}`}
                >
                    Healcare
                </button>
            </div>
        </div>
    );
};

export default CategoryFilter;
