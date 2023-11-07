import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoInLocalStorage, getUser } from '../../Store/userSlice';
import { fetchServices } from '../../Store/serviceSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatCurrency } from '../../Utils/string.helper';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';

import FormError from '../../Components/FormError/FormError';
import axios from 'axios';
import moment from 'moment';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

const Cart = () => {
    const user = useSelector(getUserInfoInLocalStorage);

    const cart = useQuery(['cart-checkout'], async () => {
        const user = getUser();

        const res = await axios.get(`https://apis20231023230305.azurewebsites.net/api/Cart/GetByUserId?id=${user?.Id}`);
        console.log(res.data.result);

        const providers = {};
        //group by provider
        cart.data?.cartDetails?.forEach((item) => {
            if (!providers[item?.birdService?.providerId]) {
                providers[item?.birdService?.providerId] = [];
            }
        });

        user.data?.cartDetails?.forEach((item) => {
            providers[item?.birdService?.providerId].push(item);
        });

        console.log(providers);

        return res.data.result;
    });

    const deleteCartItem = useMutation(
        async (id) => {
            const res = await axios.delete(
                `https://apis20231023230305.azurewebsites.net/api/CartDetail/DeleteCartDetail?id=${id}`
            );
        },
        {
            onSuccess: (data) => {
                cart.refetch();
                toast.success('Delete cart item successfully');
            },
        }
    );

    const handleUpdateQuantity = useMutation(
        async (data) => {
            const res = await axios.post(
                `https://apis20231023230305.azurewebsites.net/api/CartDetail/UpdateCartDetail?id=${data.id}`,
                data
            );

            return res.data;
        },
        {
            onSuccess: (data) => {
                cart.refetch();
            },
        }
    );

    const { itemId } = useParams();
    const navigate = useNavigate();

    const createCartMutation = useMutation(
        async (data) => {
            const ca = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Customer/GetById?id=${data.customerId}`
            );
            const res = await axios.post(
                'https://apis20231023230305.azurewebsites.net/api/BirdServiceBooking/CreateBooking',
                {
                    ...data,
                    customerId: ca.data.result.id,
                }
            );
            return data;
        },
        {
            onSuccess: (data) => {
                console.log(data);
            },
        }
    );

    const handleSubmit = async () => {
        const confirm = window.confirm('Are you sure to checkout?');
        if (confirm) {
            const providers = {};
            //group by provider
            cart.data?.cartDetails?.forEach((item) => {
                if (!providers[item?.birdService?.providerId]) {
                    providers[item?.birdService?.providerId] = [];
                }
            });

            cart.data?.cartDetails?.forEach((item) => {
                providers[item?.birdService?.providerId].push(item);
            });

            await Promise.all(
                Object.keys(providers).map((key) => {
                    const provider = providers[key];
                    const user = getUser();

                    const bookingDetails = provider.map((item) => {
                        return {
                            serviceStartDate: item?.serviceStartDate,
                            serviceEndDate: item?.serviceEndDate,
                            description: item?.description,
                            birdServiceId: item?.birdService?.id,
                            miniServiceId: item?.miniService?.id || 0,
                            price: item?.price,
                            quantity: item?.quantity,
                            priceId: item?.priceId,
                        };
                    });

                    return createCartMutation.mutateAsync({
                        bookingDetails,
                        customerId: Number(user?.Id),
                        providerId: Number(key),
                    });
                })
            );

            toast.success('Checkout successfully');
        }
    };

    return (
        <div className="flex items-start justify-center min-h-screen py-10">
            <div className="flex flex-col w-full max-w-4xl gap-10">
                <button onClick={() => navigate('/service')} className="back-button">
                    <FaArrowLeft />
                </button>
                <div className="p-4 bg-white border border-green-300 border-solid rounded-md shadow-xl">
                    <h2 className="mb-2 font-bold">Your Cart</h2>
                    <div>
                        {cart.data?.cartDetails?.length === 0 && (
                            <div className="flex items-center justify-center p-3 bg-white rounded-md">
                                <p className="text-lg font-semibold">Your cart is empty</p>
                            </div>
                        )}
                        {cart.data?.cartDetails?.map((item) => (
                            <div className="flex items-center justify-between p-3 bg-white rounded-md">
                                <div className="flex items-center gap-3">
                                    <img
                                        className="object-cover w-20 h-20 rounded-md"
                                        src={item?.birdService?.imageURL}
                                        alt="service"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold">{item?.birdService?.birdServiceName}</h3>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {
                                                    item?.birdService?.prices.find((x) => x.id === item?.priceId)
                                                        ?.priceName
                                                }
                                                {item?.birdService?.serviceCategory?.serviceType === 0 && (
                                                    <div className="text-xs font-normal">
                                                        {moment(item?.serviceStartDate).format('DD/MM/YYYY')} -{' '}
                                                        {moment(item?.serviceEndDate).format('DD/MM/YYYY')}
                                                    </div>
                                                )}
                                            </p>
                                            {Boolean(item?.miniService) && (
                                                <>
                                                    <p className="text-sm text-gray-500">
                                                        Mini service: {item?.miniService?.miniServiceName}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        e
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-semibold">
                                        <input
                                            type="number"
                                            value={item?.quantity}
                                            className="w-24"
                                            onChange={(e) => {
                                                const price = item?.birdService?.prices.find(
                                                    (x) => x.id === item?.priceId
                                                );

                                                const miniServicePrice = item?.miniService?.price || 0;
                                                const serviceStartDate = new Date(item?.serviceStartDate);
                                                const serviceEndDate = new Date(item?.serviceEndDate);
                                                const days = differenceInDays(serviceEndDate, serviceStartDate);
                                                const totalPrice =
                                                    ((price?.priceAmount || 0) + miniServicePrice) *
                                                    Number(e.target.value) *
                                                    days;

                                                handleUpdateQuantity.mutate({
                                                    id: item?.id,
                                                    quantity: Number(e.target.value),
                                                    serviceStartDate: item?.serviceStartDate,
                                                    serviceEndDate: item?.serviceEndDate,
                                                    description: item?.description,
                                                    birdServiceId: item?.birdService?.id,
                                                    miniServiceId: item?.miniService?.id,

                                                    price: totalPrice,
                                                    priceId: item?.priceId,
                                                });
                                            }}
                                        />
                                    </p>
                                    x
                                    <p className="text-lg font-semibold">
                                        {formatCurrency(
                                            item?.birdService?.prices.find((x) => x.id === item?.priceId)?.priceAmount +
                                                (item?.miniService?.price || 0)
                                        )}
                                    </p>
                                    <p className="text-lg font-semibold">{formatCurrency(item?.price)}</p>
                                    <div>
                                        <button
                                            className="text-red-500"
                                            onClick={() => {
                                                const confirm = window.confirm('Are you sure to delete this item?');
                                                if (confirm) deleteCartItem.mutate(item?.id);
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => handleSubmit()}
                        className="flex items-center gap-2 px-8 py-3 text-white duration-300 bg-green-500 rounded-md hover:bg-green-600"
                    >
                        <ShoppingBagIcon className="w-4 h-4" />
                        <span>Checkout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
