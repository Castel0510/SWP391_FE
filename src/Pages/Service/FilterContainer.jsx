import React, { useEffect, useState } from 'react';

const FilterContainer = ({ onFilterChange ,selectedCategory }) => {
  const [selectedPriceSort, setSelectedPriceSort] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const apiUrl = "https://63692ab028cd16bba716cff0.mockapi.io/login";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  items.forEach((item) => {
    if (item.selectedService && Array.isArray(item.selectedService)) {
      item.selectedService.forEach((service) => {
        serviceOptions.push(service.label);
      });
    }
  });

  useEffect(() => {
    if (selectedCategory) {
      const filteredData = items.filter((item) => item.category === selectedCategory);

      const uniqueServiceSet = new Set();
      filteredData.forEach((item) => {
        item.selectedService.forEach((service) => {
          uniqueServiceSet.add(service.label);
        });
      });

      const uniqueServiceArray = [...uniqueServiceSet];
      setServiceOptions(uniqueServiceArray);
    }
  }, [selectedCategory, items]);
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
  const handleServiceChange = (service) => {
    setSelectedService(service);
    onFilterChange({
      priceSort: selectedPriceSort,
      rating: selectedRating,
      address: selectedAddress,
      service: service,
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
      <h4>Service:</h4>
      <select
        onChange={(e) => handleServiceChange(e.target.value)}
        value={selectedService}
      >
        <option value="">Any</option>
        {serviceOptions.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterContainer;
