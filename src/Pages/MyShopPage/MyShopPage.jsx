import React from 'react'
import avatar_tmp from "../../Assets/Images/bird_hero.png"
import ServiceCardItem from '../../Components/Shared/ServiceCardItem'
import { renderRatingStars } from '../../Utils'
import { Link } from 'react-router-dom'

const MyShopPage = () => {

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
        {
            image: avatar_tmp,
            name: 'Dove',
            id: 5,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
            price: '50',
            rating: 5.0,
        },
        {
            image: avatar_tmp,
            name: 'Dove',
            id: 6,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing eli",
            price: '70',
            rating: 4.9,
        },
    ]

    return (
        <>
            <div className='min-h-[500px] my-6 mx-auto '>
                <div className='text-center mb-6'>
                    <div className='font-bold text-2xl mb-6'>MY SHOP</div>
                    <button className='text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>
                    <Link to="/createService">New Service</Link>
                    </button>
                </div>
                <div className='max-w-[1100px] flex flex-wrap justify-center gap-10 mx-auto'>
                    {fakeData && fakeData?.map((item) => (
                        <div key={item.id} className='max-w-[250px] shadow-md rounded hover:shadow-2xl cursor-pointer p-4'>
                            <img src={avatar_tmp} className='h-auto max-w-[200px]' />
                            <div className='my-4 font-bold'>{item.name}</div>
                            <div>{item.description}</div>
                            <div className='flex my-4'>
                                {renderRatingStars(item.rating)}
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.rating.toFixed(1)}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='font-bold'>${item.price}</div>
                                <button className=' text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Edit</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyShopPage