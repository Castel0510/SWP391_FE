import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { renderRatingStars } from '../../../Utils';
import axios from 'axios';


const MyShopPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // Current page number


    const items = JSON.parse(localStorage.getItem('user'));
    console.log("check", items);

    const GetByProviderId = `https://apis20231023230305.azurewebsites.net/api/BirdService/GetByProviderId?id=${items.Id}`;

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(GetByProviderId);
            setData(response.data.result);

            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };
    console.log(data);

    useEffect(() => {
        fetchData();
    }, []);




    // Number of items to display per page
    const itemsPerPage = 9;
    // Calculate the indexes of the items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the items for the current page
    const currentItems = data.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Function to handle page navigation
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <div role="status" className='flex justify-center items-center min-h-[600px]'>
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

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
                            to={{ pathname: `/item-detail-page/${item.id}` }}
                            state={{ item }}
                            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            <div>
                                <img className="rounded-t-lg min-w-full max-h-[240px]" src={item.imageURL} alt="" />
                            </div>
                            <div className="p-5 ">
                                <div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.birdServiceName}</h5>
                                </div>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2 leading-5">{item.description}</p>
                                <div className='flex my-4'>
                                    {renderRatingStars(item.avgRating)}
                                    {/* <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.rating.toFixed(1)}</span> */}
                                </div>
                                <div className='font-bold my-4'>{item.pricePerDay}$</div>
                                <div className="float-right inline-flex items-center px-3 py-2 mb-10 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Edit
                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </div>
                                <div className='pb-5 clear-both'>
                                    <span className='font-bold'>Location: </span>

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