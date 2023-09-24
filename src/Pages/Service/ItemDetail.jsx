import React from 'react';
import { useLocation } from 'react-router-dom';

const ItemDetailPage = () => {
  const location = useLocation();
  const { item } = location.state || {};

  return (
    <div className="item-detail">
      {item ? (
        <>
          <h2>{item.name}</h2>
          <p>Description: {item.description}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </>
      ) : (
        <div>Item not found</div>
      )}
    </div>
  );
};

export default ItemDetailPage;
