import Pagination from '@mui/material/Pagination';
import { Rating } from '@smastrom/react-rating';
import axios from 'axios';
import _get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getUser } from '../../Store/userSlice';
import { Link } from 'react-router-dom';

const ProviderList = () => {
    const [user, setUser] = useState(null);
    const dataUser = useSelector((state) => state.user);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setUser(getUser());
    }, [dataUser]);

    const providerQuery = useQuery(
        ['provider', page, pageSize, search],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/Provider/Get?pageIndex=0&pageSize=99999'
            );

            const filterData = res.data.result.items.filter((item) => {
                return item.providerName.toLowerCase().includes(search.toLowerCase());
            });

            setTotalPage(Math.ceil(filterData.length / pageSize));

            return filterData.slice((page - 1) * pageSize, page * pageSize);
        },
        {
            initialData: [],
        }
    );

    return (
        <>
            <div className="max-w-5xl min-h-screen px-4 py-12 mx-auto">
                <div className="text-4xl font-bold text-center">Our Provider</div>
                <div className="flex items-center justify-between max-w-lg px-4 mx-auto mt-8 border border-gray-300 border-solid rounded-md shadow-md">
                    <AiOutlineSearch className="w-6 h-6" />
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-transparent border-none outline-none ring-0 focus:!outline-none focus:outline-white"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
                <div className="flex flex-col items-center justify-between gap-4 mt-16">
                    {providerQuery.data.length === 0 && (
                        <div className="flex items-center justify-center w-full h-96">
                            <div className="text-2xl font-bold text-center">No data</div>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-8">
                        {providerQuery.data?.map((item, index) => (
                            <Link
                                to={`/provider-service-detail/${item.id}`}
                                key={item.id}
                                className="w-full p-4 bg-white border border-gray-400 border-solid rounded-lg shadow-xl "
                            >
                                <div class="w-full " aos="fade-up">
                                    <div class="provider-details-information">
                                        <div class="provider-image">
                                            <img
                                                src={item?.user?.avatarURL}
                                                alt={item?.name}
                                                class="provider-info-image"
                                            />
                                        </div>
                                        <div class="provider-info flex flex-col">
                                            <h2>{item?.providerName}</h2>
                                            <div class="flex w-full flex-1">
                                                <div class="flex flex-col gap-1">
                                                    <p className="w-full ">Name: {item?.providerName}</p>
                                                    <p>Phone: {item?.user?.phoneNumber}</p>
                                                    <p>Email: {item?.user?.email}</p>{' '}
                                                    <Rating
                                                        className="w-32 h-8"
                                                        value={_get(item, 'rating', 0)}
                                                        onChange={() => {}}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gallery">
                                        {/* <ItemDetailGallery providerId={selectedItem?.providerID} /> */}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div>
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
            </div>
        </>
    );
};

export default ProviderList;
