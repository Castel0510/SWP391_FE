import React, { useState } from 'react';

const FilterContainer = ({ onFilterChange }) => {
  const [selectedPriceSort, setSelectedPriceSort] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handlePriceSortChange = (sort) => {
    setSelectedPriceSort(sort);
    onFilterChange({ priceSort: sort, rating: selectedRating, address: selectedAddress });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onFilterChange({ priceSort: selectedPriceSort, rating, address: selectedAddress });
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    onFilterChange({
      priceSort: selectedPriceSort,
      rating: selectedRating,
      address: address,
    });
  };

  return (
    <div className="filter-container">
        
      <select onChange={(e) => handleAddressChange(e.target.value)}>
        <option value="">Any</option>
        <option value="Ha Noi">Ha Noi</option>
        <option value="Ho Chi Minh">Ho Chi Minh</option>
      </select>
      <h4>Price:</h4>
      <select value={selectedPriceSort} onChange={(e) => handlePriceSortChange(e.target.value)}>
        <option value="increase">Increase</option>
        <option value="decrease">Decrease</option>
      </select>
      <h4>Rating:</h4>
      <select value={selectedRating} onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
        <option value={0}>Any Rating</option>
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
    </div>
  );
};

export default FilterContainer;
