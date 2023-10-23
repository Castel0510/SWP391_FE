import React, { useEffect, useState } from 'react';
import "./service.scss";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import LoadingSpinner from "./LoadingSpinner";
import '../Service/service.scss';


const ItemGallery = ({ category, onItemClick, filters }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const applyFilters = (items) => {
    let filteredItems = items;

    if (filters.address) {
      filteredItems = filteredItems.filter((item) =>
        item.address.includes(filters.address)
      );
    }

    if (filters.priceSort === "increase") {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (filters.priceSort === "decrease") {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    if (filters.rating > 0) {
      filteredItems = filteredItems.filter(
        (item) => item.rating === filters.rating
      );
    }

    if (searchQuery) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.service) {
      filteredItems = filteredItems.filter(
        (item) => item.selectedService.some((service) => service.label === filters.service)
      );
    }``

    return filteredItems;
  };

  const filteredItems = applyFilters(
    category ? items.filter((item) => item.category === category) : items
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const displayedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      <div className="searchBox">
        <input
          className="search"
          type="text"
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="item-gallery">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className={`item ${currentPage === 1 ? "show" : ""}`}
            onClick={() => onItemClick(item)}
          >
            <div className="item-content">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-name">{item.name}</div>

              <div className="item-description">
                {item.description.length > 100
                  ? item.description.slice(0, 90) + "..."
                  : item.description}
              </div>

              <div className="item-rating">
                <Rating rating={item.rating} />
              </div>
              <div className="flex justify-between">
                <div className="item-price-detail">${item.price}/Day</div>
                <Link to={`/detail/${item.id}`} state={{ selectedItem: item }}>
                  <button className="book-now-button">BOOK NOW</button>
                </Link>
              </div>
              <div className="item-address">{item.address}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemGallery;
