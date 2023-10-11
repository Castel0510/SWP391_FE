import React, { useEffect, useState } from 'react';
import './service.scss';
import { Link } from 'react-router-dom';
import itemImage from '../../Assets/Images/birdspa.jpg';
import Rating from './Rating';
import LoadingSpinner from './LoadingSpinner';

const ItemGallery = ({ category, onItemClick }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const apiUrl = 'https://64b1e204062767bc4826ae59.mockapi.io/da/Product';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  let categoryItems = [];
  if (category === 'All' || !category) {
    categoryItems = items;
  } else {
    categoryItems = items.filter((item) => item.category === category);
  }

  const totalPages = Math.ceil(categoryItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = categoryItems.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="item-gallery">
        {displayedItems.map((item) => (
          <div key={item.id} className="item" onClick={() => onItemClick(item)}>
            <div className="item-content">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-name">{item.name}</div>

              <div className="item-description">
                {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
              </div>

              <div className="item-rating">
                <Rating rating={item.rating} />
              </div>
              <div className="flex justify-between">
                <div className="item-price-detail">${item.price}/Day</div>
                <Link to={`/detail/${item.id}`}>
                  <button className="book-now-button">BOOK NOW</button>
                </Link>

              </div>
              <div className="item-name">{item.address}</div>

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
