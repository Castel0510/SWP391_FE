import React, { useEffect } from 'react'
import './style.scss'
import avatar_tmp from "../../Assets/Images/bird_hero.png"
import Aos from 'aos'
import 'aos/dist/aos.css'
import ServiceCardItem from '../Shared/ServiceCardItem'

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

    return (
        <div className='top-services'>
            <div className="rank-container">
                <div data-aos='zoom-out' data-aos-duration='1000' className="title">
                    <small>Top Services</small>
                    <h2>Choose the best choice for you</h2>
                    <p>Services are highly appreciated</p>
                </div>

                <div data-aos='zoom-in' data-aos-duration='1500' className="cards">
                    {fakeData.map((item, key) => (
                        <ServiceCardItem key={key} item={item} width="w-1/5" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopBookingServicesComponent