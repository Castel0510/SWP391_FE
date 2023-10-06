import React, { useEffect } from 'react'
import './style.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'
import ServiceCardItem from '../Shared/ServiceCardItem'

const TopBookingServicesComponent = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const fakeData = [
        {
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            name: "Make a birdhouse",
            id: 1,
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            price: '25',
            rating: 2.2,
        },
        {
            image: "https://www.birds-online.de/wp-content/uploads/2019/02/Vogeldusche_Sascha_Bittner02.jpg",
            name: "Haven Retreat",
            id: 2,
            description: "Explore birdwatching, nesting, and conservation in our tranquil avian sanctuary",
            price: '30',
            rating: 3.3,
        },
        {
            image: "https://hari.ca/wp-content/uploads/2015/01/2.2.5-Punishment-__-And-th.e-parrot-e1422554834274.jpg",
            name: 'Feathered Training',
            id: 3,
            description: "Teach and bond with pet birds through professional training and enrichment.",
            price: '40',
            rating: 4.5,
        },
        {
            image: "https://www.allaboutbirds.org/news/wp-content/uploads/2020/04/SCranes-Vyn-1280x795.jpg",
            name: 'Feathered Picture',
            id: 4,
            description: "Capture the beauty of birds in their natural habitat with avian photography services.",
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