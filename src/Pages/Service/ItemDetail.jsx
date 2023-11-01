import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import YouTube from "react-youtube";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser, getUserInfoInLocalStorage } from "../../Store/userSlice";
import CommentsComponent from "./CommentComponent";

const ItemDetailPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();

  const user = useSelector(getUserInfoInLocalStorage);
  const userID = user ? user.id : null;
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${itemId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item data");
        }
        const data = await response.json();
        setSelectedItem(data.result);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [itemId, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://63692ab028cd16bba716cff0.mockapi.io/news");
        if (!response.ok) {
          throw new Error("Failed to fetch provider data");
        }
        const data = await response.json();
        setProviderData(data);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (providerData) {
      const itemsWithSameProviderID = providerData.filter(
        (item) => item.providerID === selectedItem?.providerID
      );

    }
  }, [providerData, selectedItem]);

  const handleBookNow = () => {
    if (!userID) {
      navigate("/login");
    } else {
      if (selectedItem && selectedItem.serviceCategory) {
        const { serviceCategory } = selectedItem.serviceCategory;
        const category = selectedItem.serviceCategory.serviceType;
        const { id } = selectedItem;
        
        const routeMap = {
          0: `/booking/boarding/${id}`,
          1: `/booking/grooming/${id}`,
          2: `/booking/healcare/${id}`,
        };
  
        if (category in routeMap) {
          navigate(routeMap[category]);
        } else {
          console.error("Category not found in routeMap:", category);
        }
      } else {
        console.error("Invalid selectedItem or serviceCategory is null");
      }
    }
  };
  
    // console.log('====================================');
    // console.log(selectedItem.serviceCategory.id);
    // console.log('====================================');
  
  const renderProviderData = () => {
    if (selectedItem && providerData) {
      const provider = providerData.find((item) => item.id === selectedItem.providerID);

      if (provider) {

        return (
          <div class="provider-details">
            <div class="provider-details-information">
              <div class="provider-image">
                <img src={provider.image} alt={provider.name} class="provider-info-image" />
              </div>
              <div class="provider-info">
                <h2>{provider.provider}</h2>
                <div class="info-row">
                  <div class="info-col">
                    <p>Name: {provider.name}</p>
                    <p>Phone: {provider.phone}</p>
                    <p>Email: {provider.email}</p>
                  </div>
                  <div class="info-col">
                    <p>Address: {provider.address}</p>
                    <p>Rating: {provider.rating}</p>
                    <p>Number of Services: {provider.numbOfService}</p>
                  </div>
                </div>
                <div class="info-row">
                  <div class="info-col">
                    <p>Day Join: {provider.dayJoin}</p>
                    <p>Follower: {provider.follower}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="gallery">

              <ItemDetailGallery providerId={selectedItem.providerID} />
            </div>
          </div>


        );
      }
    }
    return <p>Provider data not found</p>;
  };


  return (
    <div className="item-detail">
      {selectedItem ? (
        <div className="detail-content">
          <div className="flex">
            <div className="image">
              <button onClick={() => navigate('/service')} className="back-button">
                <FaArrowLeft />
              </button>
              <img src={selectedItem.imageURL} alt={selectedItem.birdServiceName} className="image-img" />
              
            </div>
            <div className="item-info">
              <h2>{selectedItem.birdServiceName}</h2>
              {selectedItem ? (
                <>
                  {[
                    { label: "Description", value: selectedItem.description },
                    { label: "Phone", value: selectedItem.phone },
                    { label: "Address", value: selectedItem.address },
                    { label: "Provider", value: selectedItem.provider },
                    { label: "Price", value: `$${selectedItem.pricePerDay}` },
                  ].map((item, index) => (
                    <div key={index} className="item-description-label">
                      <p className="item-label">{item.label}:</p>
                      <p className="item-detail-text">{item.value}</p>
                    </div>
                  ))}
                </>
              ) : (
                <div>Item not found</div>
              )}
            </div>
            
          </div>
          <YouTube videoId={selectedItem.videoURL}  className="youtube-container" />

          <div className="bottom-button">
            <button className="book-now-button-2" onClick={handleBookNow}>
              BOOK NOW
            </button>
          </div>
        </div>
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {selectedItem && (
        <div className="shop-detail">
          {providerData ? (
            <div>
              {selectedItem.providerID !== null ? (
                renderProviderData()
              ) : (
                <p>Provider data not found</p>
              )}
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
      <CommentsComponent />
    </div>
  );
};

export default ItemDetailPage;
