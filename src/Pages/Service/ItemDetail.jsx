import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import YouTube from "react-youtube";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemDetailGallery from "./ItemDetailGallery";
import CommentsComponent from "./CommentComponent";
import { getUser, getUserInfoInLocalStorage } from "../../Store/userSlice";

const ItemDetailPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { itemId } = useParams();
  const navigate = useNavigate();
  const [providerData, setProviderData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);



  const user = useSelector(getUserInfoInLocalStorage);
  const userID = user ? user.id : null;



  const dataUser = useSelector((state) => state.user);
  // useEffect(() => {
  //   setUser(getUser());

  // }, [dataUser]);


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
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://63692ab028cd16bba716cff0.mockapi.io/login"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch item data");
        }
        const data = await response.json();
        const item = data.find((item) => item.id === parseInt(itemId, 10));
        setSelectedItem(item);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchData();
  }, [itemId, user, navigate]);

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

  useEffect(() => {
    if (providerData && selectedItem && selectedItem.providerID) {
      const itemsWithSameProviderID = providerData.filter(
        (item) => item.id === selectedItem.providerID
      );

    }
  }, [providerData, selectedItem]);

  const handleBookNow = () => {
    if (!userID) {
      navigate("/login");
    } else {
      const { category, id } = selectedItem;
      const routeMap = {
        Hotel: `/booking/hotel/${id}`,
        Spa: `/booking/spa/${id}`,
        Medical: `/booking/medical/${id}`,
      };
      navigate(routeMap[category]);
    }
  };
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
              <img src={selectedItem.image} alt={selectedItem.name} className="image-img" />
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
                  <YouTube videoId={selectedItem.videoId} className="youtube-container" />
                </>
              ) : (
                <div>Item not found</div>
              )}
            </div>
          </div>
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
