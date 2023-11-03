import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { renderRatingStars } from '../../../Utils';
import axios from 'axios';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';

const MyShopPage = () => {
    const items = JSON.parse(localStorage.getItem('userInfo'));
    // console.log("check id: ", items?.id);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPage, setTotalPage] = useState(0);

    const serviceQuery = useQuery(
        ['service', items?.id, page, pageSize],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/BirdService/GetByProviderId?id=${items?.id}`
            );

            setTotalPage(Math.ceil(res.data.result.length / pageSize));

            return res.data.result.slice((page - 1) * pageSize, page * pageSize);
        },
        {
            initialData: [],
        }
    );

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `https://apis20231023230305.azurewebsites.net/api/BirdService/Delete?id=${id}`
            );

            toast.success('Delete successfully!');

            serviceQuery.refetch();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <>
            <div className="min-h-[500px] my-6 mx-auto ">
                <div className="flex items-center justify-between">
                    <div className="mb-6 text-2xl font-bold">My Shop</div>
                    <Link
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                        to={'/createService'}
                    >
                        New Service
                    </Link>
                </div>

                <div className="grid grid-cols-4 gap-8 ">
                    {serviceQuery.data.map((item, index) => (
                        <div
                            key={index}
                            className="flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            <div className="w-full">
                                <img
                                    className="rounded-t-lg w-full h-[240px] object-cover"
                                    src={item.imageURL}
                                    alt=""
                                />
                            </div>
                            <div className="p-5 ">
                                <div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                        {item.birdServiceName}
                                    </h5>
                                </div>
                                <p className="mb-3 font-normal leading-5 text-gray-700 dark:text-gray-400 line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="flex justify-end">
                                    <Link
                                        to={{ pathname: `/editService/${item.id}` }}
                                        state={{ item }}
                                        className="inline-flex items-center px-10 py-2 mb-10 mr-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Edit
                                    </Link>
                                    <div
                                        className="inline-flex items-center px-8 py-2 mb-10 text-sm font-medium text-center text-white bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-center mt-6">
                    {totalPage > 1 && (
                        <div className="col-span-4">
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
        </>
    );
};

export default MyShopPage;
