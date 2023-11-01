import { Rating } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './service.scss'
import LoadingSpinner from './LoadingSpinner';


const ItemDetailGallery = ({ providerId }) => {
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (providerId) {
      const apiUrl = `https://63692ab028cd16bba716cff0.mockapi.io/login?providerID=${providerId}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setGalleryData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching gallery data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [providerId]);
  const handleBookNow = () => {
    setIsLoading(true);
    
    window.scrollTo(0, 0);
  
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  };
  return (
    <div className="item-gallery-detail">
      {loading ? (
        <div className="loading-spinner">
            <LoadingSpinner/>
        </div>
      ) : galleryData ? (
        <>
          {galleryData.map((item) => (
            <div key={item.id} className="item-content-detail">
              <div className="item-image-detail">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-name-detail">{item.name}</div>
              <div className="item-description-detail leading-5">
                {item.description.length > 50
                  ? item.description.slice(0, 50) + "..."
                  : item.description}
              </div>
              <div className="item-rating-detail">
                <Rating rating={item.rating} />
              </div>
              <div className="flex justify-between-detail">
                <div className="item-price-detail-detail">${item.price}/Day</div>
                <Link to={`/detail/${item.id}`} state={{ galleryData: item }}>
                  <button onClick={(e) => handleBookNow(e)} className="book-now-button-detail">
                    BOOK NOW
                  </button>
                </Link>
              </div>
              <div className="item-address-detail">{item.address}</div>
            </div>
          ))}
        </>
      ) : (
        <p>Gallery data not found</p>
      )}
    </div>
  );
};

export default ItemDetailGallery;
