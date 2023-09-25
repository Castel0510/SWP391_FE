import React from 'react'
import "../Provider/providerStyle.scss"
import ShopItem from './ShopItem'


const providerHomePage = () => {
  return (
    <div>
        <div className="title">YOURSHOP</div>
        <div className="add-button">+BUTTON</div>
        <div className="provier-list-item ">
            <ShopItem></ShopItem>
        </div>
    </div>
  )
}

export default providerHomePage
