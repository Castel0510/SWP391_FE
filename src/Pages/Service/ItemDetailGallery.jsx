import { Rating } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './service.scss'


const ItemDetailGallery = ({ providerId }) => {
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  console.log(galleryData);
  return (
    <div className="item-gallery-detail">
    {loading ? (
      <p>Loading gallery data...</p>
    ) : galleryData ? (
      <>
        {galleryData.map((item) => (
          <div key={item.id} className="item-content-detail">
            <div className="item-image-detail">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-name-detail">{item.name}</div>
            <div className="item-description-detail leading-5">
              {item.description.length > 100
                ? item.description.slice(0, 90) + "..."
                : item.description}
            </div>
            <div className="item-rating-detail">
              <Rating rating={item.rating} />
            </div>
            <div className="flex justify-between-detail">
              <div className="item-price-detail-detail">${item.price}/Day</div>
              <Link to={`/detail/${item.id}`} state={{ galleryData: item }}>
                <button className="book-now-button-detail">BOOK NOW</button>
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
