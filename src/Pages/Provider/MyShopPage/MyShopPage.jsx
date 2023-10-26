import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { renderRatingStars } from '../../../Utils';

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

                <div className='flex flex-wrap justify-center gap-8 mx-auto'>
                    {currentItems.map(item => (
                        <Link
                            key={item.id}
                            to={{
                                pathname: `/item-detail-page/${item.id}`,
                            }}
                            state={{ item }}
                            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div>
                                <img className="rounded-t-lg min-w-full max-h-[240px]" src={item.image} alt="" />
                            </div>
                            <div className="p-5 ">
                                <div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                </div>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2 leading-5">{item.description}</p>
                                <div className='flex my-4'>
                                    {renderRatingStars(item.rating)}
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.rating.toFixed(1)}</span>
                                </div>
                                <div className='font-bold my-4'>${item.price}</div>
                                <div className="float-right inline-flex items-center px-3 py-2 mb-10 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Edit
                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </div>
                                <div className='pb-5 clear-both'>
                                    <span className='font-bold'>Location: </span>
                                    {item.location}
                                </div>
                            </div>
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