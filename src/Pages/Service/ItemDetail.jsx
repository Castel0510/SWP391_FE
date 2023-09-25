import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import itemImage from "../../Assets/Images/bird_hero.png"


const ItemDetailPage = () => {
  const items = [
    { id: 1, name: 'Hotel  1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 100 },
    { id: 2, name: 'Hotel  2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 3, name: 'Spa 1', description: 'Description for Spa1', price: 50 },
    { id: 4, name: 'Spa  2', description: 'Description for Spa 2', price: 70 },
    { id: 5, name: 'Medical 1', description: 'Description for Medical 1', price: 200 },
    { id: 6, name: 'Medical 2', description: 'Description for Medical2', price: 250 },
    { id: 7, name: 'Cage 1', description: 'Description for Cage1', price: 30 },
    { id: 8, name: 'Cage2', description: 'Description for Cage 2', price: 40 },
  ]

  const location = useLocation();
  const { item } = location.state || {};
  const { itemId } = useParams();
  const selectedItem = items.find((i) => i.id === parseInt(itemId, 10));



  return (
    <div className="item-detail">
      {selectedItem ? (
        <>
          <div>
          <img src={itemImage} alt={selectedItem.name} />
          </div>
          <div>
            <h2>{selectedItem.name}</h2>
            <p>Description: {selectedItem.description}</p>
            <p>Price: ${selectedItem.price}</p>
          </div>
          <button onClick={() => window.history.back()}>Go Back</button>
          <Link to={`/booking/${selectedItem.id}`}>
              <button className="book-now-button">BOOK NOW</button>
            </Link>

        </>
      ) : (
        <div>Item not found</div>
      )}
    </div>
  );
};

export default ItemDetailPage;
