import React, { useState } from 'react'
import { renderRatingStars } from '../../Utils'
import { Link } from 'react-router-dom'

const MyShopPage = () => {
    const itemsPerPage = 9; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1); // Current page number

    const fakeData = [
        {
            id: 1,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '50',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 2,
            name: "Haven Retreat",
            email: "duc@gmail.com",
            phone: "0916480138",
            image: "https://www.birds-online.de/wp-content/uploads/2019/02/Vogeldusche_Sascha_Bittner02.jpg",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Explore birdwatching, nesting, and conservation in our tranquil avian sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '50',
            rating: 2.2,
            location: 'HN'
        },
        {
            id: 3,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 4,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 5,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 6,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 7,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 8,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 9,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 10,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 11,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },
        {
            id: 12,
            name: "Make a birdhouse",
            email: "email1@gmail.com",
            phone: "0916480138",
            image: "https://cdn.vatgia.com/pictures/thumb/w750/2015/08/sny1438530685.png",
            video: "https://www.youtube.com/watch?v=N-zPpTfr8nU&ab_channel=TV360ThểThao",
            description: "Craft your custom birdhouse: Build, paint to your garden sanctuary.",
            category: "Boarding",
            service: "Bird sitting",
            sizeData: [
                { size: "Small", sizePrice: "50" },
                { size: "Medium", sizePrice: "60" },
            ],
            price: '25',
            rating: 2.2,
            location: 'TP.HCM'
        },

    ]

    // Calculate the indexes of the items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the items for the current page
    const currentItems = fakeData.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(fakeData.length / itemsPerPage);

    // Function to handle page navigation
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className='min-h-[500px] my-6 mx-auto '>
                <div className='text-center mb-6'>
                    <div className='font-bold text-2xl mb-6'>MY SHOP</div>
                    <Link
                        className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 '
                        to={'/createService'}
                    >
                        New Service
                    </Link>
                </div>

                <div className='max-w-[1100px] flex flex-wrap justify-center gap-10 mx-auto'>
                    {currentItems.map((item) => (
                        // Render each item component
                        <Link
                            key={item.id}
                            to={{
                                pathname: `/item-detail-page/${item.id}`,
                            }}
                            state={{ item }}
                            className='max-w-[250px] shadow-md rounded hover:shadow-2xl cursor-pointer p-4'
                        >
                            {/* Item content */}
                            <img src={item.image} className='h-fit w-fit' />
                            <div className='my-4 font-bold'>{item.name}</div>
                            <div className='line-clamp-2 leading-normal'>{item.description}</div>
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

                {/* Pagination */}
                <div className='flex justify-center items-center mt-6'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`mr-2 p-2 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-800'
                                }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyShopPage