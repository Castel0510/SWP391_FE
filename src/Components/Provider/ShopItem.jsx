import React from 'react'
import "../Provider/providerStyle.scss"

const ShopItem = () => {
    const items = [
        { id: 1, name: 'Hotel  1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 100 },
      { id: 2, name: 'Hotel  2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', price: 120 },
    ]
  return (
    <div className="item-gallery">
    {items.map((item) => (
      <div
        key={item.id}
        className="item"
        // onClick={() => onItemClick(item)}
      >
        <div className="shop-item-name">{item.name}</div>
        <div className="shop-item-description">{item.description}</div>
       <div className='flex'>
       <div className="shop-item-price">${item.price}</div>
        <button className="edit-button bg-black">edit</button>
       </div>
      </div>
    ))}
  </div>
  )
}

export default ShopItem
