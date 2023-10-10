import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ItemDetailPage = (props) => {
//   const { id } = useParams();
//   const selectedItem = props.find(item => item.id === id);
  const location = useLocation();
  const selectedItem = location.state?.selectedItem;


//   if (!selectedItem) {
//     return <div>Item not foundss</div>;
//   }

  return (
    <div>
      <h1>{selectedItem.name}</h1>
      <p>{selectedItem.description}</p>
      {console.log(selectedItem.name)}
      <div>asd</div>
    </div>
  );
};

export default ItemDetailPage;