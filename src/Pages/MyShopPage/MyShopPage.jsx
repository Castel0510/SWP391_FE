import React from 'react'
import { renderRatingStars } from '../../Utils'
import { Link } from 'react-router-dom'

const MyShopPage = () => {

    const fakeData = [
        {
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            name: "Make a birdhouse",
            id: 1,
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            image: "https://www.birds-online.de/wp-content/uploads/2019/02/Vogeldusche_Sascha_Bittner02.jpg",
            name: "Haven Retreat",
            id: 2,
            description: "Explore birdwatching, nesting, and conservation in our tranquil avian sanctuary",
            price: '30',
            rating: 3.3,
            location: 'Hà Nội'
        },
        {
            image: "https://hari.ca/wp-content/uploads/2015/01/2.2.5-Punishment-__-And-th.e-parrot-e1422554834274.jpg",
            name: 'Feathered Training',
            id: 3,
            description: "Teach and bond with pet birds through professional training and enrichment.",
            price: '40',
            rating: 4.5,
            location: 'Đà Nẵng'
        },
        {
            image: "https://www.allaboutbirds.org/news/wp-content/uploads/2020/04/SCranes-Vyn-1280x795.jpg",
            name: 'Feathered Picture',
            id: 4,
            description: "Capture the beauty of birds in their natural habitat with avian photography services.",
            price: '50',
            rating: 5.0,
            location: 'Huế'
        },
    ]


    return (
        <>
            <div className='min-h-[500px] my-6 mx-auto '>
                <div className='text-center mb-6'>
                    <div className='font-bold text-2xl mb-6'>MY SHOP</div>
                    <Link className='text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '
                        to={'/createService'}>
                        New Service
                    </Link>
                </div>

                <div className='max-w-[1100px] flex flex-wrap justify-center gap-10 mx-auto'>
                    {fakeData && fakeData?.map((item) => (
                        <Link
                            key={item.id}
                            to={{
                                pathname: `/item-detail-page/${item.id}`,

                            }}

                            state={{ item }}

                            className='max-w-[250px] shadow-md rounded hover:shadow-2xl cursor-pointer p-4'>
                            <img src={item.image} className='h-fit w-fit' />
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
                            <div className='my-6'><span className='font-bold'>Location:</span> {item.location}</div>
                        </Link>

                    ))}
                </div>
            </div>
        </>
    )
}

export default MyShopPage