import React, { useState } from 'react'
import HeroComponent from '../../Components/HeroComponent'
import CategoryFilter from './CategoryFilter';
import '../Service/service.scss'
import ItemGallery from './ItemGallery';

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
        <div className='flex mt-10 ml-16'>
          <input type="text" class="w-96 px-4 py-2  border-black rounded-2xl focus:outline-none focus:border-gray-500 mr-7 border-2" placeholder="" />
          <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-2xl w-36 h-11 font-serif">
            Search
          </button>
        </div>
        <div className='flex'>
          <div className='ml-16 mt-20 flex-1'>
            <CategoryFilter onCategoryChange={handleCategoryChange} />
          </div>
          <div className='bg-gray-200 w-9/12 mt-20 border-black rounded-2xl'>
            <ItemGallery category={selectedCategory}  onItemClick={onItemClick} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServicePage