import React from 'react'
import './style.scss'
import { LuHotel } from 'react-icons/lu'
import { GiShower } from 'react-icons/gi'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import { IoHomeOutline } from 'react-icons/io5'

const CategoryComponent = () => {
    return (
        <div className='category'>
            <div className="info-container">
                <div className="title">
                    <small>category</small>
                    <h2>Choose the best choice for you</h2>
                    <p>Some of the category we provide</p>
                </div>

                <div className="cards">
                    <div className="single-card">
                        <div className="icon-div">
                            <LuHotel className='icon' />
                        </div>
                        <span className='card-title'>
                            Bird Hotel
                        </span>
                        <p>hmmmmmmmmmm mmmmmmmmmmmmm</p>
                    </div>

                    <div className="single-card ">
                        <div className="icon-div ">
                            <GiShower className='icon' />
                        </div>
                        <span className='card-title'>
                            Bird Spa
                        </span>
                        <p>hmmmmmmmmmm mmmmmmmmmmmmm</p>
                    </div>

                    <div className="single-card ">
                        <div className="icon-div ">
                            <AiOutlineMedicineBox className='icon' />
                        </div>
                        <span className='card-title'>
                            Bird Medical
                        </span>
                        <p>hmmmmmmmmmmm mmmmmmmmmmmm</p>
                    </div>

                    <div className="single-card ">
                        <div className="icon-div ">
                            <IoHomeOutline className='icon' />
                        </div>
                        <span className='card-title'>
                            Bird Case
                        </span>
                        <p>hmmmmmmmmmm mmmmmmmmmmmmm</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent