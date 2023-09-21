import React, { useEffect } from 'react'
import './style.scss'
import { LuHotel } from 'react-icons/lu'
import { GiShower } from 'react-icons/gi'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import { IoHomeOutline } from 'react-icons/io5'
import Aos from 'aos'
import 'aos/dist/aos.css'

const CategoryComponent = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const categoryList = [
        {
            duration: '2500',
            icon: <LuHotel className='icon' />,
            name: 'Bird Hotel',
            description: 'hmmmmmmmmmm mmmmmmmmmmmmm'
        },
        {
            duration: '3500',
            icon: <GiShower className='icon' />,
            name: 'Bird Spa',
            description: 'hmmmmmmmmmm mmmmmmmmmmmmm'
        },
        {
            duration: '4500',
            icon: <AiOutlineMedicineBox className='icon' />,
            name: 'Bird Medical',
            description: 'hmmmmmmmmmm mmmmmmmmmmmmm'
        },
        {
            duration: '5500',
            icon: <IoHomeOutline className='icon' />,
            name: 'Bird Case',
            description: 'hmmmmmmmmmm mmmmmmmmmmmmm'
        }
    ]

    return (
        <div className='category'>
            <div className="info-container">
                <div data-aos='flip-down' data-aos-duration='1000' className="title">
                    <small>category</small>
                    <h2>Choose the best choice for you</h2>
                    <p>Some of the category we provide</p>
                </div>

                <div className="cards">
                    {categoryList.map((item, key) => (
                        <div data-aos='fade-right' data-aos-duration={item.duration} className="single-card"
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

export default CategoryComponent