import React, { useEffect, useState } from 'react';
import './service.scss';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import LoadingSpinner from './LoadingSpinner';
import '../Service/service.scss';

const ItemGallery = ({ category, onItemClick, filters }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://apis20231023230305.azurewebsites.net/api/BirdService/GetAllService'
                );
                if (response.ok) {
                    const data = await response.json();

                    const transformedItems = data.result.map((item) => ({
                        ...item,
                        serviceCategory: {
                            id: item.serviceCategory.serviceType,
                            categoryName: item.serviceCategory.categoryName,
                            serviceType: item.serviceCategory.serviceType,
                        },
                    }));

                    setItems(transformedItems);

                    console.log('Data fetched:', data);
                    setLoading(false);
                } else {
                    console.log('Request failed with status:', response.status);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [category, filters]);

    const applyFilters = (items) => {
        let filteredItems = items;

        if (filters.address) {
            filteredItems = filteredItems.filter((item) => item.address.includes(filters.address));
        }

        if (filters.priceSort === 'increase') {
            filteredItems.sort((a, b) => a.price - b.price);
        } else if (filters.priceSort === 'decrease') {
            filteredItems.sort((a, b) => b.price - a.price);
        }

        if (filters.rating > 0) {
            filteredItems = filteredItems.filter((item) => item.avgRating === filters.rating);
        }

        if (searchQuery) {
            filteredItems = filteredItems.filter((item) =>
                item.birdServiceName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filters.service) {
            filteredItems = filteredItems.filter(
                (item) => item.serviceCategory.categoryName.toLowerCase() === filters.service.toLowerCase()
            );
        }
        if (category !== null) {
            filteredItems = filteredItems.filter((item) => {
                return item.serviceCategory.id === category;
            });
        }

        return filteredItems;
    };

    const filteredItems = applyFilters(category ? items.filter((item) => item.serviceCategory.id === category) : items);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
    ];

    const displayedItems = filteredItems.slice(startIndex, endIndex);

    return (
        <div>
            <div className="searchBox">
                <input
                    className="search"
                    type="text"
                    placeholder="Search by item name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="bg-white">
                <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="relative group">
                                <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="item-gallery">
                {displayedItems.map((item) => (
                    <div
                        key={item.id}
                        className={`item ${currentPage === 1 ? 'show' : ''}`}
                        onClick={() => onItemClick(item)}
                    >
                        <div className="item-content">
                            <div className="item-image">
                                <img src={item.imageURL} alt={item.imageURL} />
                            </div>
                            <div className="item-name">{item.birdServiceName}</div>

                            <div className="item-description">
                                {item.description.length > 50
                                    ? item.description.slice(0, 65) + '...'
                                    : item.description}
                            </div>

                            <div className="item-rating">
                                <Rating rating={item.avgRating} />
                            </div>
                            <div className="flex justify-between">
                                <div className="item-price-detail">${item.prices[0].priceAmount}/Day</div>
                                <Link to={`/detail/${item.id}`} state={{ selectedItem: item }}>
                                    <button className="book-now-button">BOOK NOW</button>
                                </Link>
                            </div>
                            <div className="item-address">{item.address}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination-container">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ItemGallery;
