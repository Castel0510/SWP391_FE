import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Rating from "./Rating";
import { FaArrowLeft } from "react-icons/fa";
import YouTube from "react-youtube";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ItemDetailPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userID = user ? user.id : null;
  console.log(userID);



  // useEffect(() => {
  //   if (!user) {

  //     navigate("/login");
  //     return;
  //   }

  // })
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64b1e204062767bc4826ae59.mockapi.io/da/Product"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const item = data.find((item) => item.id === parseInt(itemId, 10));
        setSelectedItem(item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemId, user, navigate]);

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
  const handleBookNow = () => {
    if (!userID) {
      navigate("/login");
    } else {
      if (selectedItem.category === "Hotel") {
        navigate(`/booking/hotel/${selectedItem.id}`);
      } else if (selectedItem.category === "Spa") {
        navigate(`/booking/spa/${selectedItem.id}`);
      } else if (selectedItem.category === "Medical") {
        navigate(`/booking/medical/${selectedItem.id}`);
      }
    }
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

              {/* <div className="rating">
                <Rating
                  rating={selectedItem.rating}
                  onRate={(newRating) => onRate(selectedItem.id, newRating)}
                />
              </div> */}
            </div>
            <div className="item-info">
              <h2>{selectedItem.name}</h2>
              {selectedItem ? (
                <>
                  {[
                    { label: "Description", value: selectedItem.description },
                    { label: "Phone", value: selectedItem.phone },
                    { label: "Address", value: selectedItem.address },
                    { label: "Provider", value: selectedItem.provider },
                    { label: "Price", value: `$${selectedItem.price}` },
                  ].map((item, index) => (
                    <div key={index} className="item-description-label">
                      <p className="item-label">{item.label}:</p>
                      <p className="item-detail-text">{item.value}</p>
                    </div>
                  ))}
                  <YouTube
                    videoId={selectedItem.videoId}
                    className="youtube-container"
                  />
                </>
              ) : (
                <div>Item not found</div>
              )}
            </div>
          </div>
          <div className="bottom-button">
            <button
              className="book-now-button-2"
              onClick={handleBookNow}

            // onClick={() => navigate(`/booking/${selectedItem.id}`)}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
