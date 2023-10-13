import React from 'react';
import { useLocation } from 'react-router-dom';

const ItemDetailPage = () => {

  const location = useLocation();
  const item = location.state?.item;
  console.log(location.state?.item);

  if (!item) {
    return <div>Item not founds</div>;
  }

  return (
    <div>
      <img src={item.image} alt="" />
      <div>{item.name}</div>
      <div>{item.description}</div>
      <div>{item.price}</div>
      <div>{item.rating}</div>
    </div>
  );
};

export default ItemDetailPage;