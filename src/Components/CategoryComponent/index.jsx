import React, { useEffect } from 'react'
import './style.scss'
import { LuHotel } from 'react-icons/lu'
import { GiShower } from 'react-icons/gi'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../Utils' 

const CategoryComponent = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    //gốc là category nhưng sau đổi cho đúng định hướng nên thành services
    //nhưng vẫn để category để ko bị ảnh hưởng đến các liên kết code khác
    const categoryList = [
        {
            duration: '2500',
            icon: <LuHotel className='icon' />,
            name: 'boarding',
            description: 'The ideal place to stay for your pet birds. Professional team, classy amenities, and top safety.',
        },
        {
            duration: '3500',
            icon: <GiShower className='icon' />,
            name: 'grooming',
            description: 'Where to enjoy the best care for your pet birds.'
        },
        {
            duration: '4500',
            icon: <AiOutlineMedicineBox className='icon' />,
            name: 'healthcare',
            description: 'Specializing in providing top medical services for pet birds.'
        },
    ]

    return (
        <div className='category'>
            <div className="info-container">
                <div data-aos='flip-down' data-aos-duration='1000' className="title">
                    <small>services</small>
                    <h2>Choose the best choice for you</h2>
                    <p>Some of the services we provide</p>
                </div>

                <div className="cards">
                    {categoryList.map((item, key) => (
                        <Link
                            data-aos='fade-right'
                            data-aos-duration={item.duration}
                            className="single-card"
                            key={key}
                            to={`/service?activeItem=${item.name}`}
                        >
                            <div className="icon-div">
                                {item.icon}
                            </div>
                            <span className='card-title'>
                                {capitalizeFirstLetter(item.name)}
                            </span>
                            <p>{item.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent