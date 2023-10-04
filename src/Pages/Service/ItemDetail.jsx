import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import itemImage from "../../Assets/Images/bird_hero.png"

import itemImage2 from "../../Assets/Images/birdspa.jpg"
import Rating from './Rating';
import { FaArrowLeft } from 'react-icons/fa';

const ItemDetailPage = () => {
  const items = [
    { id: 1, name: 'Hotel for bird', rating: 3.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider A', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 100 },
    { id: 2, name: 'Hotel for bird', rating: 3.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 3, name: 'Spa  2', rating: 4.5, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 4, name: 'Spa  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 5, name: 'Spa  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 6, name: 'Spa  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 7, name: 'Medical  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 8, name: 'Medical  2', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },

  ]

  const location = useLocation();
  const { item } = location.state || {};
  const { itemId } = useParams();
  const selectedItem = items.find((i) => i.id === parseInt(itemId, 10));



  const onRate = (itemId, newRating) => {
    console.log(`Rated item ${itemId} with rating ${newRating}`);
  };
  // console.log('====================================');
  // console.log(selectedItem.id);
  // console.log('====================================');

  return (

    <div className="item-detail">

      {selectedItem ? (

        <div className="detail-content">

          <div className='flex'>
            <div className="image">
              <button onClick={() => window.history.back()} className="back-button">
                <FaArrowLeft />
              </button>
              <img src={itemImage} alt={selectedItem.name} />
              <div className='rating'>
                <Rating rating={selectedItem.rating} onRate={(newRating) => onRate(selectedItem.id, newRating)} />
              </div>
            </div>
            <div className="item-info">
              <h2>{selectedItem.name}</h2>
              <p className="item-label">Description:</p>
              <p className="item-detail-text">{selectedItem.description}</p>
              <p className="item-label">Phone:</p>
              <p className="item-detail-text">{selectedItem.phone}</p>
              <p className="item-label">Address:</p>
              <p className="item-detail-text">{selectedItem.address}</p>
              <p className="item-label">Provider:</p>
              <p className="item-detail-text">{selectedItem.provider}</p>
              <p className="item-label">Price:</p>
              <p className="item-detail-text">${selectedItem.price}</p>
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
