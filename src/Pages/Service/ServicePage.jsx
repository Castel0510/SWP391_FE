import React, { useEffect, useState } from 'react'
import HeroComponent from '../../Components/HeroComponent'
import CategoryFilter from './CategoryFilter';
import '../Service/service.scss'
import ItemGallery from './ItemGallery';
import itemImage from "../../Assets/Images/bird_hero.png"
import { AiOutlineFilter } from "react-icons/ai"
import MultipleSelect from '../../Components/Shared/MultipleSelect'
import { renderRatingStars } from '../../Utils'

import { useLocation } from 'react-router-dom';
import FilterContainer from './FilterContainer';


const ServicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const onItemClick = (item) => {
    console.log(`Item clicked: ${item.name}`);

  };


  return (
    <div>
      <HeroComponent />

      <div className='h-fit'>
        <div className='flex-1 category'>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
        <div className='flex '>       
              <FilterContainer></FilterContainer>
          <div className='bg-gray-200 w-9/12 mt-20 border-black rounded-2xl'>
            <ItemGallery category={selectedCategory} onItemClick={onItemClick} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServicePage