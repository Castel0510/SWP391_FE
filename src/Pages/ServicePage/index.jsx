import React, { useEffect, useState } from 'react'
import CommonSection from '../../Components/Shared/CommonSection'
import "./style.scss"
import { AiOutlineFilter } from "react-icons/ai"
import avatar_tmp from "../../Assets/Images/bird_hero.png"
import ServiceCardItem from '../../Components/Shared/ServiceCardItem'
import { renderRatingStars } from '../../Utils'
import { useLocation } from 'react-router-dom';
import MultipleSelect from '../../Components/Shared/MultipleSelect'


const ServicePage = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  //filter theo address
  const addressList = ['Hồ Chí Minh', 'Hà Nội']

  //mảng data fake
  const fakeData = [
    {
      image: avatar_tmp,
      name: "Parrot",
      id: 1,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
      price: '25',
      rating: 2.2,
    },
    {
      image: avatar_tmp,
      name: "Swallow",
      id: 2,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
      price: '30',
      rating: 3.3,
    },
    {
      image: avatar_tmp,
      name: 'Albatross',
      id: 3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
      price: '40',
      rating: 4.5,
    },
    {
      image: avatar_tmp,
      name: 'Dove',
      id: 4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
      price: '50',
      rating: 5.0,
    },
    {
      image: avatar_tmp,
      name: 'Dove',
      id: 4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
      price: '50',
      rating: 5.0,
    },
  ]

  return (
    <div className='service-page'>
      <CommonSection title="Services" listItems={listService} activeItem={activeItem} updateFilteredItems={updateFilteredItems} />

      <div className='service-content'>
        <div className='container-left'>

          {/* button search */}
          <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative focus:outline-none">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none focus:outline-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>

          <div className='filter-container'>
            <div className='flex gap-2 my-2'>
              <AiOutlineFilter />
              <p className='text-transform: uppercase'>Search filter</p>
            </div>

            <div className='category-filter'>
              <p className='title'>Category</p>
              <MultipleSelect listMultiSelect={filteredItems}/>
            </div>

            <div className='category-filter'>
              <p className='title'>Address</p>
              <MultipleSelect listMultiSelect={addressList}/>
            </div>

            <div className='price-filter'>
              <p className='title'>Price</p>

              <div className="flex flex-wrap">
                <div className='range-price-container'>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border-gray-300 border w-2/5 p-2 rounded-lg"
                  />

                  <div className='w-3 h-px bg-black'></div>

                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border-gray-300 border w-2/5 p-2 rounded-lg"
                  />
                </div>

                <button
                  onClick={applyPriceFilter}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className='rating-filter'>
              <p className='title'>Rating</p>

              <div className='list-rating justify-center'>
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
        </div>

        <div className='container-right'>
          <div className="cards">
            {fakeData.map((item, key) => (
              <ServiceCardItem key={key} item={item} width="w-2/6" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicePage