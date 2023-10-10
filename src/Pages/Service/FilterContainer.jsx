import React, { useEffect, useState } from 'react';
import itemImage from '../../Assets/Images/bird_hero.png';
import { AiOutlineFilter } from 'react-icons/ai';
import MultipleSelect from '../../Components/Shared/MultipleSelect';
import { renderRatingStars } from '../../Utils';

import { useLocation } from 'react-router-dom';

const FilterContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const onItemClick = (item) => {
        console.log(`Item clicked: ${item.name}`);
    };

    const listService = [
        {
            name: 'boarding',
            categories: ['Babysitting', 'Birdcage Design'],
        },
        {
            name: 'grooming',
            categories: ['Nail Clipping', 'Beak Trimming', 'Wing Clipping'],
        },
        {
            name: 'medical',
            categories: ['DNA Sexing'],
        },
    ];

    const addressList = ['Hồ Chí Minh', 'Hà Nội'];

    const urlSearchParams = new URLSearchParams(window.location.search);
    const activeItem =
        urlSearchParams.get('activeItem')?.length > 1
            ? urlSearchParams.get('activeItem')
            : 'boarding';

    // filter theo category
    const [filteredItems, setFilteredItems] = useState([]);

    const updateFilteredItems = (newActiveItem) => {
        const item = listService.find((item) => item.name === newActiveItem);
        setFilteredItems(item?.categories || []);
    };

    useEffect(() => {
        updateFilteredItems(activeItem);
    }, [activeItem]);

    // filter theo price
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const applyPriceFilter = () => { };

    // filter theo rating
    const ratingOptions = [5, 4, 3, 2, 1];
    const [selectedRating, setSelectedRating] = useState(null);

    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
    };

    return (
        <div>
            <div className="container-left">
                {/* button search */}
                <form>
                    <label htmlFor="default-search" className="search-label">
                        Search
                    </label>
                    <div className="search-input-container">
                        <div className="search-icon">
                            <svg
                                className="search-icon-svg"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="search-input"
                            placeholder="Search"
                            required
                        />
                        <button
                            type="submit"
                            className="search-button"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <div className="filter-container">
                    <div className="filter-flex">
                        <AiOutlineFilter />
                        <p className="filter-label">Search filter</p>
                    </div>

                    <div className="category-filter">
                        <p className="filter-title">Category</p>
                        <MultipleSelect listMultiSelect={filteredItems} />
                    </div>

                    <div className="category-filter">
                        <p className="filter-title">Address</p>
                        <MultipleSelect listMultiSelect={addressList} />
                    </div>

                    <div className="price-filter">
                        <p className="filter-title">Price</p>

                        <div className="filter-price-flex">
                            <div className="range-price-container">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="filter-input"
                                />

                                <div className="filter-divider"></div>

                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="filter-input"
                                />
                            </div>

                            <button
                                onClick={applyPriceFilter}
                                className="filter-apply-button"
                            >
                                Apply
                            </button>
                        </div>
                    </div>

                    <div className="rating-filter">
                        <p className="filter-title">Rating</p>

                        <div className="filter-rating-flex">
                            {ratingOptions.map((rating, index) => (
                                <div key={index} className="filter-rating-option">
                                    <input
                                        type="radio"
                                        id={`rating-${rating}`}
                                        name="rating"
                                        value={rating}
                                        onChange={handleRatingChange}
                                        className="filter-radio"
                                    />
                                    <label
                                        htmlFor={`rating-${rating}`}
                                        className={`filter-rating-label ${selectedRating === rating ? 'active' : ''
                                            }`}
                                    >
                                        {renderRatingStars(rating)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterContainer;
