import React from 'react';

import "./service.scss"
import { Link } from 'react-router-dom';
import itemImage from "../../Assets/Images/birdspa.jpg"
import itemImage2 from "../../Assets/Images/bird_hero.png"
import Rating from './Rating';


const ItemGallery = ({ category, onItemClick }) => {

  const items = [
    { id: 1, name: 'Hotel for bird', category: 'Hotel', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider A', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 100 },
    { id: 2, name: 'Hotel for bird', category: 'Hotel', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 3, name: 'Spa  2', category: 'Spa', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 4, name: 'Spa  2', category: 'Spa', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 5, name: 'Spa  2', category: 'Spa', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 6, name: 'Spa  2', category: 'Spa', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 7, name: 'Medical  2', category: 'Medical', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    { id: 8, name: 'Medical  2', category: 'Medical', rating: 5.0, phone: '092456711', address: '12 Tran Hung Dao, Ho Chi Minh', provider: 'Provider B', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
  ];

  let categoryItems = [];

  if (category === 'All' || !category) {
    categoryItems = items;
  } else {
    categoryItems = items.filter((item) => item.category === category);
  }

  return (
    <div className="item-gallery">
      {categoryItems.map((item) => (
        <div key={item.id} className="item" onClick={() => onItemClick(item)}>
          <div className="item-image">
            <img src={itemImage} alt={item.name} />
          </div>
          <div className="item-content">
            <div className="item-name">{item.name}</div>
            <div className="item-description">{item.description}</div>
            <div className='item-rating'>
              <Rating rating={item.rating}/>
            </div>
            <div className="flex justify-between mt-5">
              <div className="item-price">${item.price}/Day</div>
              <Link to={`/detail/${item.id}`}>
                <button className="book-now-button">BOOK NOW</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemGallery;
