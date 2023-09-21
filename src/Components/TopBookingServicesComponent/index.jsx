import React from 'react'
import './style.scss'

const TopBookingServicesComponent = () => {

    const fakeData = [
        {
            image: '',
            name: '',
            id: '',
            description: '',
            price: '',
            rating: '',
        },
        {
            image: '',
            name: '',
            id: '',
            description: '',
            price: '',
            rating: '',
        },
        {
            image: '',
            name: '',
            id: '',
            description: '',
            price: '',
            rating: '',
        }
    ]

    return (
        <div className='top-services'>
            <div className="rank-container">
                <div className="title">
                    <small>category</small>
                    <h2>Choose the best choice for you</h2>
                    <p>Some of the category we provide</p>
                </div>

                <div className="cards">
                    {fakeData.map((item, key) => (
                        <div className="single-card"
                            key={key}
                        >
                            <div className="icon-div">
                                {item.icon}
                            </div>
                            <span className='card-title'>
                                {item.name}
                            </span>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopBookingServicesComponent