import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { formatCurrency } from '../../Utils/string.helper';
import { toast } from 'react-toastify';

const OrderDetailPage = () => {
    const { orderId } = useParams();

    const cart = useQuery(
        ['order', orderId],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/GetBookingInfoById?id=${orderId}`
            );

            return res.data.result;
        },
        {
            initialData: {},
        }
    );

    const workingStatus = [
        {
            label: 'Waiting',
            value: 0,
        },

        {
            label: 'Confirmed',
            value: 1,
        },
        {
            label: 'Checked In',

            value: 2,
        },
        {
            label: 'CheckedOut',
            value: 3,
        },
        {
            label: 'Cancel',
            value: 4,
        },
    ];

    const orderStatus = [
        {
            label: 'Waiting',
            value: 'waiting',
            status: 0,
        },

        {
            label: 'Already paid',
            value: 'already paid',
            status: 1,
        },

        {
            label: 'Cancel',
            value: 'cancel',
            status: 2,
        },
    ];

    return (
        <div className={`order-detail`}>
            <div className="max-w-5xl min-h-screen mx-auto my-12 mb-4">
                <button onClick={() => window.history.back()} className="back-button">
                    <FaArrowLeft />
                </button>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 mt-4 border border-green-300 border-solid rounded-lg">
                            <div className="mb-2 text-2xl font-semibold">Customer</div>
                            <div className="w-16 h-16">
                                <img
                                    src={cart.data?.customer?.user?.avatarURL}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="font-semibold">Name</div>
                                <div>{cart.data?.customer?.user?.fullname}</div>
                                <div className="font-semibold">Email</div>
                                <div>{cart.data?.customer?.user?.email}</div>
                                <div className="font-semibold">Phone</div>
                                <div>{cart.data?.customer?.user?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className="p-4 mt-4 border border-green-300 border-solid rounded-lg">
                            <div className="mb-2 text-2xl font-semibold">Provider</div>
                            <div className="w-16 h-16">
                                <img
                                    src={cart.data?.provider?.user?.avatarURL}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="font-semibold">Name</div>
                                <div>{cart.data?.provider?.user?.fullname}</div>
                                <div className="font-semibold">Email</div>
                                <div>{cart.data?.provider?.user?.email}</div>
                                <div className="font-semibold">Phone</div>
                                <div>{cart.data?.provider?.user?.phoneNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-4 text-2xl font-semibold">
                            Order Detail - {moment(cart.createAt).format('DD/MM/YYYY')} -{' '}
                            <span
                                className={clsx('', {
                                    'text-yellow-500': cart.data?.bookingStatus === 0,
                                    'text-green-500': cart.data?.bookingStatus === 1,
                                    'text-red-500': cart.data?.bookingStatus === 2,
                                })}
                            >
                                {orderStatus.find((x) => x.status === cart?.data.bookingStatus)?.label}
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {cart.data?.bookingDetails?.map((item) => (
                                <div
                                    key={item?.id}
                                    className="flex items-center justify-between p-3 bg-white border border-green-300 border-solid rounded-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            className="object-cover w-20 h-20 rounded-md"
                                            src={item?.birdService?.imageURL}
                                            alt="service"
                                        />
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold">
                                                {item?.birdService?.birdServiceName}
                                            </h3>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    {
                                                        item?.birdService?.prices.find((x) => x.id === item?.priceId)
                                                            ?.priceName
                                                    }
                                                    {item?.birdService?.serviceCategory?.serviceType === 0 && (
                                                        <div className="text-xs font-normal">
                                                            Expected Date:{' '}
                                                            {moment(item?.serviceStartDate).format('DD/MM/YYYY')} -{' '}
                                                            {moment(item?.serviceEndDate).format('DD/MM/YYYY')}
                                                        </div>
                                                    )}

                                                    <div className="text-xs font-normal">
                                                        Actual Date:{' '}
                                                        {moment(item?.actualStartDate).format('DD/MM/YYYY')} -{' '}
                                                        {moment(item?.actualEndDate).format('DD/MM/YYYY')}
                                                    </div>
                                                </p>
                                                <div className="text-sm ">
                                                    <div className="font-medium text-green-500 ">
                                                        Working Status:{' '}
                                                        {
                                                            workingStatus.find((x) => x.value === item?.workingStatus)
                                                                ?.label
                                                        }
                                                    </div>
                                                </div>
                                                {Boolean(item?.miniService) && (
                                                    <>
                                                        <p className="text-sm text-gray-500">
                                                            Mini service: {item?.miniService?.miniServiceName}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-lg font-semibold">
                                            <input type="number" value={item?.quantity} className="w-24" readOnly />
                                        </p>
                                        x<p className="text-lg font-semibold">{item?.price / item?.quantity}</p>
                                        <p className="text-lg font-semibold">{formatCurrency(item?.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4 pr-2">
                        <div className="text-gray-600">Total</div>
                        <div className="text-xl font-bold">
                            {formatCurrency(
                                cart.data?.bookingDetails?.reduce((acc, item) => {
                                    return acc + item?.price;
                                }, 0)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
