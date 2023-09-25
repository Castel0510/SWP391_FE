import React, { useEffect } from 'react'
import './style.scss'
import avatar_tmp from "../../Assets/Images/bird_hero.png"
import Aos from 'aos'
import 'aos/dist/aos.css'

const TopBookingServicesComponent = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const fakeData = [
        {
            image: avatar_tmp,
            name: "Parrot",
            id: 1,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
            price: '25',
            rating: 2.2,
        },
        {
            image: avatar_tmp,
            name: "Swallow",
            id: 2,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
            price: '30',
            rating: 3.3,
        },
        {
            image: avatar_tmp,
            name: 'Albatross',
            id: 3,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
            price: '40',
            rating: 4.5,
        },
        {
            image: avatar_tmp,
            name: 'Dove',
            id: 4,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
            price: '50',
            rating: 5.0,
        },
    ]

    const renderRatingStars = (rating) => {
        const numberOfYellowStars = Math.floor(rating);
        const numberOfGrayStars = 5 - numberOfYellowStars;
        const stars = [];

        for (let i = 0; i < numberOfYellowStars; i++) {
            stars.push(
                <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            )
        }

        for (let i = 0; i < numberOfGrayStars; i++) {
            stars.push(
                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            )
        }

        return stars;

    }

    return (
        <div className='top-services'>
            <div className="rank-container">
                <div data-aos='zoom-out' data-aos-duration='1000' className="title">
                    <small>Top Services</small>
                    <h2>Choose the best choice for you</h2>
                    <p>Services are highly appreciated</p>
                </div>

                <div data-aos='zoom-in' data-aos-duration='1500' className="cards">
                    {fakeData.map((item) => (
                        <div key={item.id} className="w-full mx-2 max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 single-card">
                            <a href="#">
                                <img className="p-8 rounded-t-lg" src={item.image} alt="services image" />
                            </a>
                            <div className="px-5 pb-5">
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                </a>

                                <p className="text-gray-500 text-sm">{item.description}</p>

                                {/* rating */}
                                <div className="flex items-center mt-2.5 mb-5">
                                    {renderRatingStars(item.rating)}
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.rating.toFixed(1)}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                                    <a href="#" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopBookingServicesComponent