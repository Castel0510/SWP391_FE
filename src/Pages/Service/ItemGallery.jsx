import React from 'react';

import "./service.scss"
import { Link } from 'react-router-dom';


const ItemGallery = ({ category, onItemClick }) => {

  const items = {
    Hotel: [
      { id: 1, name: 'Hotel  1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 100 },
      { id: 2, name: 'Hotel  2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    ],
    Spa: [
      { id: 3, name: 'Spa 1', description: 'Description for Spa1', price: 50 },
      { id: 4, name: 'Spa  2', description: 'Description for Spa 2', price: 70 },
    ],
    Medical: [
      { id: 5, name: 'Medical 1', description: 'Description for Medical 1', price: 200 },
      { id: 6, name: 'Medical 2', description: 'Description for Medical2', price: 250 },
    ],
    Cage: [
      { id: 7, name: 'Cage 1', description: 'Description for Cage1', price: 30 },
      { id: 8, name: 'Cage2', description: 'Description for Cage 2', price: 40 },
    ],
  };

  let categoryItems = [];

  if (category === 'All' || !category) {
    categoryItems = Object.values(items).flat();
  } else {
    categoryItems = items[category] || [];
  }

  return (
    <div className="item-gallery">
      {categoryItems.map((item) => (
        <div
          key={item.id}
          className="item"
          onClick={() => onItemClick(item)}
        >
          <div className="item-name">{item.name}</div>
          <div className="item-description">{item.description}</div>
          <div className='flex justify-between mt-5'>
            <div className="item-price">${item.price}</div>
            <Link to={`/detail/${item.id}`}>
              <button className="book-now-button">BOOK NOW</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemGallery;
