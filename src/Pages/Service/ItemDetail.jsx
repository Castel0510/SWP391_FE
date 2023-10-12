import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Rating from "./Rating";
import { FaArrowLeft } from "react-icons/fa";
import YouTube from "react-youtube";

const ItemDetailPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const { itemId } = useParams();
  const [randomImage, setRandomImage] = useState("");
  const [videoSrc, setVideoSrc] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://64b1e204062767bc4826ae59.mockapi.io/da/Product"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (items.length > 0 && itemId) {
      const selectedItem = items.find(
        (item) => item.id === parseInt(itemId, 10)
      );
      setSelectedItem(selectedItem);
    }
  }, [items, itemId]);

  const onRate = (itemId, newRating) => {
    console.log(`Rated item ${itemId} with rating ${newRating}`);
  };

  return (
    <div className="item-detail">
      {selectedItem ? (
        <div className="detail-content">
          <div className="flex">
            <div className="image">
              <button
                onClick={() => window.history.back()}
                className="back-button"
              >
                <FaArrowLeft />
              </button>
              <img src={selectedItem.image} alt={selectedItem.name} />
              <div className="rating">
                <Rating
                  rating={selectedItem.rating}
                  onRate={(newRating) => onRate(selectedItem.id, newRating)}
                />
              </div>
            </div>
            <div className="item-info">
              <h2>{selectedItem.name}</h2>
              <div className="item-description-label">
                <p className="item-label">Description:</p>
                <p className="item-detail-text">{selectedItem.description}</p>
              </div>
              <div className="item-description-label">
                <p className="item-label">Phone:</p>
                <p className="item-detail-text">{selectedItem.phone}</p>
              </div>
              <div className="item-description-label">
                <p className="item-label">Address:</p>
                <p className="item-detail-text">{selectedItem.address}</p>
              </div>
              <div className="item-description-label">
                <p className="item-label">Provider:</p>
                <p className="item-detail-text">{selectedItem.provider}</p>
              </div>
              <div className="item-description-label">
                <p className="item-label">Price:</p>
                <p className="item-detail-text">${selectedItem.price}</p>
              </div>
              <YouTube videoId={selectedItem.videoId} className="youtube-container"/>
            </div>
          </div>
          <div className="bottom-button">
            <Link to={`/booking/${selectedItem.id}`}>
              <button className="book-now-button">BOOK NOW</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>Item not found</div>
      )}
    </div>
  );
};

export default ItemDetailPage;
