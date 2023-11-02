import React, { useState } from 'react';
import HeroComponent from '../../Components/HeroComponent';
import CategoryFilter from './CategoryFilter';
import ItemGallery from './ItemGallery';
import FilterContainer from './FilterContainer';
import { RadioGroup } from '@headlessui/react';
import '../Service/service.scss';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { formatCurrency } from '../../Utils/string.helper';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ReactPaginate from 'react-paginate';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import Pagination from '@mui/material/Pagination';
import { locationOptions } from '../../models/bird';

const plans = [
    { id: 0, name: 'Boarding' },
    { id: 1, name: 'Grooming' },
    { id: 2, name: 'Health Care' },
];

const orderBy = [
    { id: 0, name: 'Price: Low to High' },
    { id: 1, name: 'Price: High to Low' },
];

const ServicePage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [categoryIds, setCategoryIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [serviceLocations, setServiceLocations] = useState([]);

    // const [selectedCategory, setSelectedCategory] = useState(null);
    // const [selectedFilters, setSelectedFilters] = useState({
    //     addresses: [],
    //     priceSort: '',
    //     rating: 0,
    // });

    // const handleCategoryChange = (category) => {
    //     setSelectedCategory(category);
    // };

    // const handleFilterChange = (filters) => {
    //     setSelectedFilters(filters);
    // };

    // const onItemClick = (item) => {
    //     console.log(`Item clicked: ${item.birdServiceName}`);
    // };
    const serviceQuery = useQuery(
        ['service', page, pageSize, categoryIds, searchQuery, `order-${selectedOrder}`, serviceLocations],
        async () => {
            const res = await axios.get('https://apis20231023230305.azurewebsites.net/api/BirdService/GetAllService');

            setTotalPage(Math.ceil(res.data.result.length / pageSize));
            const serviceLocationOptions = res.data.result
                .map((item) => item?.serviceLocation)
                .filter((v, i, a) => a.indexOf(v) === i)
                .filter((item) => item);

            return res.data?.result

                .filter((item) => {
                    if (categoryIds?.length === 0) {
                        return true;
                    }

                    return categoryIds.includes(item.serviceCategory?.serviceType);
                })
                .filter((item) => {
                    if (searchQuery === '') {
                        return true;
                    }

                    return item?.birdServiceName?.toLowerCase().includes(searchQuery?.toLowerCase());
                })
                .sort((a, b) => {
                    if (selectedOrder === 0) {
                        return (
                            a.prices.sort((a, b) => a?.priceAmount - b?.priceAmount)[0]?.priceAmount -
                            b.prices.sort((a, b) => a?.priceAmount - b?.priceAmount)[0]?.priceAmount
                        );
                    } else {
                        return (
                            b.prices.sort((a, b) => a?.priceAmount - b?.priceAmount)[0]?.priceAmount -
                            a.prices.sort((a, b) => a?.priceAmount - b?.priceAmount)[0]?.priceAmount
                        );
                    }
                })
                .filter((item) => {
                    if (serviceLocations?.length === 0) {
                        return true;
                    }

                    return serviceLocations?.includes(item?.location);
                })
                .slice((page - 1) * pageSize, page * pageSize);
        },
        {
            initialData: [],
        }
    );

    return (
        <div className="min-h-screen fade-in">
            <div className="flex justify-center gap-16 mx-auto my-16 text-5xl font-bold text-center max-w-7xl text-[#34a853]">
                Our Services
            </div>
            <div className="flex gap-16 px-4 mx-auto my-16 max-w-7xl">
                <div className="flex flex-col w-64 gap-4 rounded-lg shrink-0">
                    <div className="">
                        <div>
                            <div className="text-sm font-medium text-gray-600">Category</div>
                            <div className="flex flex-col gap-2 mt-4">
                                {plans.map((plan) => (
                                    <div
                                        className={clsx(' font-medium duration-300', {
                                            'text-green-600 !font-bold': categoryIds.includes(plan.id),
                                        })}
                                        key={plan.id}
                                        value={plan}
                                        onClick={() => {
                                            const newCategoryIds = [...categoryIds];

                                            if (categoryIds.includes(plan.id)) {
                                                newCategoryIds.splice(newCategoryIds.indexOf(plan.id), 1);
                                            } else {
                                                newCategoryIds.push(plan.id);
                                            }
                                            setCategoryIds(newCategoryIds);
                                        }}
                                    >
                                        {plan.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full h-[1px] my-4 bg-gray-600/30 rounded-lg shadow-lg"></div>
                        <div>
                            <div className="text-sm font-medium text-gray-600">Name</div>
                            <div className="flex flex-col gap-2 mt-4">
                                <input
                                    className="w-full px-4 py-2 text-sm duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                                    type="text"
                                    placeholder="Search by item name"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-4 text-sm font-medium text-gray-600">Order by</div>
                            <div className="flex flex-col gap-2 mt-4">
                                <select
                                    className="w-full px-4 py-2 text-sm duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                                    value={selectedOrder}
                                    onChange={(e) => setSelectedOrder(e.target.value)}
                                >
                                    {orderBy.map((order) => (
                                        <option key={order.id} value={order.id}>
                                            {order.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="mt-4 text-sm font-medium text-gray-600">Location</div>
                            <div className="flex flex-col gap-2 mt-4">
                                {locationOptions.map((serviceLocation) => (
                                    <div
                                        className={clsx(' font-medium duration-300', {
                                            'text-green-600 !font-bold': serviceLocations.includes(
                                                serviceLocation.value
                                            ),
                                        })}
                                        key={serviceLocation}
                                        onClick={() => {
                                            const newServiceLocations = [...serviceLocations];

                                            if (serviceLocations.includes(serviceLocation.value)) {
                                                newServiceLocations.splice(
                                                    newServiceLocations.indexOf(serviceLocation.value),
                                                    1
                                                );
                                            } else {
                                                newServiceLocations.push(serviceLocation.value);
                                            }
                                            setServiceLocations(newServiceLocations);
                                        }}
                                    >
                                        {serviceLocation.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid flex-1 grid-cols-3 gap-4 ">
                    {serviceQuery.isLoading && (
                        <div className="col-span-4">
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </div>
                    )}
                    {serviceQuery.data?.length === 0 && (
                        <div className="col-span-4">
                            <div className="flex flex-col w-full h-full gap-4">
                                <div className="text-2xl font-semibold text-gray-600">No results found</div>
                            </div>
                        </div>
                    )}
                    {serviceQuery.data?.map((item) => (
                        <div key={item?.id} className="relative col-span-1 group fade-in">
                            <div className="w-full overflow-hidden bg-gray-200 border-2 border-green-100 border-solid rounded-md lg:h-80">
                                <img
                                    src={item?.imageURL}
                                    alt={item?.birdServiceName}
                                    className="object-cover object-center w-full h-full "
                                />
                            </div>
                            <div className="flex flex-col mt-4">
                                <div>
                                    <h3 className="text-2xl font-semibold text-green-700">
                                        <Link to={`/detail/${item?.id}`} className="line-clamp-1">
                                            {item?.birdServiceName}
                                        </Link>
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between flex-1 w-full gap-2 text-sm font-medium text-gray-900">
                                    <div>From:</div>
                                    <div className="text-lg font-bold">
                                        {formatCurrency(
                                            item.prices.sort((a, b) => a?.priceAmount - b?.priceAmount)[0]?.priceAmount
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {totalPage > 1 && (
                        <div className="col-span-3 mt-4">
                            <Pagination
                                count={totalPage}
                                page={page}
                                onChange={(e, value) => {
                                    setPage(value);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* <div className="min-h-screen">
                <div className="flex-filter category">
                    <CategoryFilter onCategoryChange={handleCategoryChange} />
                </div>
                <div className="flex-filter ">
                    <FilterContainer
                        onFilterChange={handleFilterChange}
                        selectedFilters={selectedFilters}
                        selectedCategory={selectedCategory}
                    />
                    <div className="w-9/12 mt-20 border-black rounded-2xl">
                        <ItemGallery category={selectedCategory} onItemClick={onItemClick} filters={selectedFilters} />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default ServicePage;
