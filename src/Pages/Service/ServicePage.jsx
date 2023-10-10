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
  const listService = [
    {
      name: "boarding",
      categories: ["Babysitting", "Birdcage Design"]
    },
    {
      name: "grooming",
      categories: ["Nail Clipping", "Beak Trimming", "Wing Clipping"]
    },
    {
      name: "medical",
      categories: ["DNA Sexing"]
    }
  ]
  const addressList = ['Hồ Chí Minh', 'Hà Nội']

  const urlSearchParams = new URLSearchParams(window.location.search);
  const activeItem = urlSearchParams.get("activeItem")?.length > 1 ? urlSearchParams.get("activeItem") : "boarding";

  //filter theo category
  const [filteredItems, setFilteredItems] = useState([]);
  const updateFilteredItems = (newActiveItem) => {
    const item = listService.find(item => item.name === newActiveItem);
    setFilteredItems(item?.categories || []);
  };

  useEffect(() => {
    updateFilteredItems(activeItem);
  }, [activeItem]);

  //filter theo price
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const applyPriceFilter = () => {
  };

  //filter theo rating
  const ratingOptions = [5, 4, 3, 2, 1];
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  return (
    <div>
      <HeroComponent />

      <div className='h-fit'>
        <div className='flex-1 category'>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
        <div className='flex '>
            {/* <div className='container-right bg-gray-100 mr-14 mt-20 w-1/5 h-100px'>

              <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative focus:outline-none">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none focus:outline-none">
                    <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="" placeholder="Search" required />
                  <button type="submit" className="">Search</button>
                </div>
              </form>

              <div className='filter-container'>
                <div className='flex gap-2 my-2'>
                  <AiOutlineFilter />
                  <p className='text-transform: uppercase'>Search filter</p>
                </div>

                <div className='category-filter'>
                  <p className='title'>Category</p>
                  <MultipleSelect listMultiSelect={filteredItems} />
                </div>

                <div className='category-filter'>
                  <p className='title'>Address</p>
                  <MultipleSelect listMultiSelect={addressList} />
                </div>

                <div className='price-filter flex flex-col'>
                  <p className='title'>Price</p>

                  <div className="flex flex-col">
                    <div className='range-price-container'>
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className=""
                      />

                      <div className='w-3 h-px bg-black'></div>

                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className=""
                      />
                    </div>

                    <button
                      onClick={applyPriceFilter}
                      className=""
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className='rating-filter'>
                  <p className='title'>Rating</p>

                  <div className='list-rating justify-center flex'>
                    {ratingOptions.map((rating, index) => (
                      <div key={index} className={`rating-option`} >
                        <input
                          type='radio'
                          id={`rating-${rating}`}
                          name='rating'
                          value={rating}
                          onChange={handleRatingChange}
                          className='hidden'
                        />
                        <label htmlFor={`rating-${rating}`} className={`cursor-pointer  ${selectedRating === rating ? 'active' : ''}`}>
                          {renderRatingStars(rating)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>



            </div> */}

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