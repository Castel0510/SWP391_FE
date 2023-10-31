import React, { useEffect, useState } from 'react';

const FilterContainer = ({ onFilterChange, selectedCategory }) => {
  const [selectedPriceSort, setSelectedPriceSort] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);

  const [loading, setLoading] = useState(true);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  useEffect(() => {
    const apiUrl = "https://apis20231023230305.azurewebsites.net/api/BirdService/GetAllService?pageIndex=0&pageSize=10";
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems3(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const apiUrl = "https://63692ab028cd16bba716cff0.mockapi.io/login";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        // Extract unique service labels here
        const uniqueServiceLabels = new Set();
        data.forEach((item) => {
          if (item.selectedService && Array.isArray(item.selectedService)) {
            item.selectedService.forEach((service) => {
              uniqueServiceLabels.add(service.label);
            });
          }
        });
        setServiceOptions(Array.from(uniqueServiceLabels));

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const apiUrl = "https://63692ab028cd16bba716cff0.mockapi.io/login";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems2(data);

        const uniqueServiceLabels = new Set();
        data.forEach((item) => {
          if (!selectedCategory || item.category === selectedCategory) {
            if (item.selectedService && Array.isArray(item.selectedService)) {
              item.selectedService.forEach((service) => {
                uniqueServiceLabels.add(service.label);
              });
            }
          }
        });
        setServiceOptions(Array.from(uniqueServiceLabels));

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [selectedCategory]);

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

  const handleClearFilters = () => {
    setSelectedPriceSort('');
    setSelectedRating(0);
    setSelectedAddress('');
    setSelectedService('');
    onFilterChange({
      priceSort: '',
      rating: 0,
      address: '',
      service: '',
    });
  };


  return (
    <div className="filter-container">
      <div className="filter-option">
        <label>Location:</label>
        <select onChange={(e) => handleAddressChange(e.target.value)}>
          <option value="">Any</option>
          <option value="Ha Noi">Hà Nội</option>
          <option value="Ho Chi Minh">Hồ Chí Minh</option>
          <option value="Da Nang">Đà Nẵng</option>

        </select>
      </div>
      <div className="filter-option">
        <label>Price:</label>
        <select value={selectedPriceSort} onChange={(e) => handlePriceSortChange(e.target.value)}>
          <option value="">Any</option>
          <option value="increase">Increase</option>
          <option value="decrease">Decrease</option>
        </select>
      </div>
      <div className="filter-option">
        <label>Rating:</label>
        <select value={selectedRating} onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
          <option value={0}>Any Rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>
      <div className="filter-option">
        <label>Service:</label>
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
      <button className="clear-filters-button" onClick={handleClearFilters}>
        Clear choices
      </button>
    </div>
  );
};

export default FilterContainer;
