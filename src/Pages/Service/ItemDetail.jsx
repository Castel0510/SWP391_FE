import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import YouTube from 'react-youtube';
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser, getUserInfoInLocalStorage } from '../../Store/userSlice';
import CommentsComponent from './CommentComponent';
import _get from 'lodash/get';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import { birdSizeOptions, birdTypeOptions } from '../../models/bird';
import { formatCurrency, formatNumberFixed } from '../../Utils/string.helper';

const ItemDetailPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [providerData, setProviderData] = useState(null);
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const user = useSelector(getUserInfoInLocalStorage);
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const userID = user ? user.id : null;
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await fetch(
                    `https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${itemId}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch item data');
                }
                const data = await response.json();
                setIsNeedUpdate(false);
                setSelectedItem(data.result);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        fetchItemData();
    }, [itemId, navigate, isNeedUpdate]);
    useEffect(() => {
        if (!selectedItem) return;

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://apis20231023230305.azurewebsites.net/api/Provider/GetByProviderId?id=${selectedItem.providerId}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch provider data');
                }
                const data = await response.json();
                setProviderData(data.result);
            } catch (error) {
                console.error('Error fetching provider data:', error);
            }
        };

        fetchData();
    }, [selectedItem]);

    const handleBookNow = () => {
        if (!userID) {
            navigate('/login');
        } else {
            if (selectedItem && selectedItem.serviceCategory) {
                const { serviceCategory } = selectedItem.serviceCategory;
                const category = selectedItem.serviceCategory.serviceType;
                const { id } = selectedItem;

                const routeMap = {
                    0: `/booking/boarding/${id}`,
                    // 1: `/booking/boarding/${id}`,
                    // 2: `/booking/boarding/${id}`,
                    1: `/booking/grooming/${id}`,
                    2: `/booking/healcare/${id}`,
                };

                if (category in routeMap) {
                    navigate(routeMap[category]);
                } else {
                    console.error('Category not found in routeMap:', category);
                }
            } else {
                console.error('Invalid selectedItem or serviceCategory is null');
            }
        }
    };

    // console.log('====================================');
    // console.log(selectedItem.serviceCategory.id);
    // console.log('====================================');

    const renderProviderData = () => {
        if (selectedItem && providerData) {
            return (
                <div class="w-full " aos="fade-up">
                    <div class="provider-details-information">
                        <div class="provider-image">
                            <img
                                src={providerData?.user?.avatarURL}
                                alt={providerData?.name}
                                class="provider-info-image"
                            />
                        </div>
                        <div class="provider-info flex flex-col">
                            <h2>{providerData?.providerName}</h2>
                            <div class="flex w-full flex-1">
                                <div class="flex flex-col gap-1">
                                    <p className="w-full ">Name: {providerData?.user?.fullname}</p>

                                    <p>Phone: {providerData?.user?.phoneNumber}</p>

                                    <p>Email: {providerData?.user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gallery">{/* <ItemDetailGallery providerId={selectedItem?.providerID} /> */}</div>
                </div>
            );
        }
        return <p className="w-full">Provider data not found</p>;
    };

    return (
        <div className="max-w-6xl py-12 mx-auto">
            {selectedItem ? (
                <div className="">
                    <div className="flex gap-10">
                        <div className="w-[600px] h-[600px] shrink-0 rounded-lg overflow-hidden" data-aos="fade-up">
                            {/* <button onClick={() => navigate('/service')} className="back-button">
                                <FaArrowLeft />
                            </button> */}
                            <img
                                src={selectedItem?.imageURL}
                                alt={selectedItem?.birdServiceName}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="w-full ">
                            <h2 className="text-4xl font-semibold text-green-600">{selectedItem?.birdServiceName}</h2>

                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">
                                        {formatNumberFixed(_get(selectedItem, 'avgRating', 0), 2)}
                                    </span>
                                    <Rating
                                        className="w-32 h-8"
                                        value={_get(selectedItem, 'avgRating', 0)}
                                        onChange={setRating}
                                        readOnly
                                    />
                                    <span>{_get(selectedItem, 'serviceFeedbacks', []).length} reviews</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-semibold ">Description</div>
                                    <div className="leading-6">{selectedItem?.description}</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-semibold ">Category</div>
                                    <div className="leading-6">{selectedItem?.serviceCategory?.categoryName}</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-semibold ">Price</div>
                                    <div className="flex flex-col gap-4 leading-6">
                                        {selectedItem.prices.map((item) => {
                                            const birdType = birdTypeOptions.find(
                                                (option) => option.value === item?.birdType
                                            );

                                            const birdSize = birdSizeOptions.find(
                                                (option) => option.value === item?.birdSize
                                            );

                                            return (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between max-w-xs font-mediu">
                                                        <div>{birdType?.label}</div>
                                                        <div>{birdSize?.label}</div>
                                                    </div>
                                                    <div className="text-xl font-semibold">
                                                        {formatCurrency(item?.priceAmount)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-semibold ">Mini Services</div>
                                    <div className="flex flex-col gap-4 leading-6">
                                        {selectedItem.miniServices.map((item) => {
                                            return (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between max-w-xs font-mediu">
                                                        <div>{item?.miniServiceName}</div>
                                                    </div>
                                                    <div className="text-xl font-semibold">
                                                        {formatCurrency(item?.price)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="">
                                    <button
                                        className="bg-[#34a853] inline-block px-16 py-4 rounded-md text-white hover:bg-[#228b22] duration-300 shadow-lg shadow-green-600"
                                        onClick={handleBookNow}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16">
                        <YouTube videoId={selectedItem.videoURL} iframeClassName="w-full h-[700px]" />
                    </div>
                </div>
            ) : (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            {selectedItem && (
                <div className="w-full p-4 my-16 bg-white border border-gray-400 border-solid rounded-lg shadow-xl ">
                    {providerData ? (
                        <div>
                            {selectedItem?.providerID !== null ? (
                                renderProviderData()
                            ) : (
                                <p className="text-gray-600">Provider data not found</p>
                            )}
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            )}
            <CommentsComponent
                serviceId={selectedItem?.id}
                userId={userID}
                onChange={() => setIsNeedUpdate(true)}
                serviceFeedbacks={_get(selectedItem, 'serviceFeedbacks', [])}
            />
        </div>
    );
};

export default ItemDetailPage;
