import React, { useState } from 'react';
import HeroComponent from '../../Components/HeroComponent';
import CategoryFilter from './CategoryFilter';
import ItemGallery from './ItemGallery';
import FilterContainer from './FilterContainer'; 
import '../Service/service.scss';

const ServicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    addresses: [],
    priceSort: '',
    rating: 0,
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const onItemClick = (item) => {
    console.log(`Item clicked: ${item.birdServiceName}`);
  };
  

  return (
    <div>
      <div className='h-fit'>
        <div className='flex-filter  category'>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
        <div className='flex-filter '>
          <FilterContainer onFilterChange={handleFilterChange} selectedFilters={selectedFilters}  selectedCategory={selectedCategory}  />
          <div className='w-9/12 mt-20 border-black rounded-2xl'>
            <ItemGallery
              category={selectedCategory}
              onItemClick={onItemClick}
              filters={selectedFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
