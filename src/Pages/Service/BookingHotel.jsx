import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoInLocalStorage } from '../../Store/userSlice';
import { fetchServices } from '../../Store/serviceSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatCurrency } from '../../Utils/string.helper';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';
import FormError from '../../Components/FormError/FormError';
import axios from 'axios';
import { getUser } from '../../Store/userSlice';
import { birdSizeOptions } from '../../models/bird';

const validationSchema = Yup.object().shape({
    birdServiceId: Yup.string().required('Service ID is required'),
    description: Yup.number().required('Description is required'),
    miniServiceId: Yup.number().required('Mini service ID is required'),
    // serviceStartDate: Yup.date().required('Check-in date is required'),
    // serviceEndDate: Yup.date()
    //     .required('Check-out date is required')
    //     .min(Yup.ref('serviceStartDate'), 'Check-out date must be after check-in date'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quantity is required'),
    cartId: Yup.number().required('Cart ID is required'),
});

const BookingHotel = () => {
    const methods = useForm(
        {
            defaultValues: {
                birdServiceId: '',
                description: '',
                miniServiceId: '',
                serviceStartDate: '',
                serviceEndDate: '',
                price: 0,
                quantity: 1,
                cartId: '',
            },
        },
        {
            resolver: yupResolver(validationSchema),
        }
    );
    const user = useSelector(getUserInfoInLocalStorage);

    const cart = useQuery(
        ['cart-32132'],
        async () => {
            const user = getUser();

            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Cart/GetByUserId?id=${user?.Id}`
            );

            return res.data.result;
        },
        {
            onSuccess: (data) => {
                methods.setValue('cartId', data.id);
            },
        }
    );

    const { itemId, ...res } = useParams();

    const navigate = useNavigate();
    const [selectPriceId, setSelectPriceId] = useState(null);

    const [selectMiniServiceId, setSelectMiniServiceId] = useState(null);
    const { data: services } = useQuery(
        ['services', itemId],
        async () => {
            const response = await fetch(
                `https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${itemId}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data.result;
        },
        {
            enabled: !!itemId,
            initialData: {},
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setTimeout(() => {
                    methods.setValue('birdServiceId', data.id);
                    setSelectPriceId(data.prices[0].id);
                }, 1000);
            },
        }
    );
    useEffect(() => {
        if (services !== null) {
            methods.setValue('serviceStartDate', format(new Date(), 'yyyy-MM-dd'));
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            methods.setValue('serviceEndDate', format(nextDay, 'yyyy-MM-dd'));

            methods.setValue('customerId', user.id);
        }
    }, [services]);

    const selectPriceOption = useMemo(() => {
        if (services && services.prices) {
            return services.prices.map((priceItem) => {
                console.log(priceItem);

                return {
                    name: priceItem.priceName,
                    label: `${priceItem.priceName} (${formatCurrency(priceItem.priceAmount)}) (${
                        priceItem?.birdType?.birdName
                    } - ${birdSizeOptions.find((item) => item.value === priceItem?.birdType?.birdSize)?.label})`,
                    value: priceItem.id,
                };
            });
        }

        return [];
    }, [services]);

    const selectMiniServiceOption = useMemo(() => {
        if (services && services.miniServices) {
            return services.miniServices.map((miniServiceItem) => {
                return {
                    name: miniServiceItem.miniServiceName,
                    label: `${miniServiceItem.miniServiceName} (${formatCurrency(miniServiceItem.price)})`,
                    value: miniServiceItem.id,
                };
            });
        } else {
            return [];
        }
    }, [services]);

    const watchServiceStartDate = methods.watch('serviceStartDate');
    const watchServiceEndDate = methods.watch('serviceEndDate');
    const quantity = methods.watch('quantity');
    const totalPrice = methods.watch('price');
    useEffect(() => {
        if (!services || !services.prices || !selectPriceId || !quantity) {
            return;
        }

        const checkInDate = new Date(watchServiceStartDate);
        const checkOutDate = new Date(watchServiceEndDate);
        const days = services?.serviceCategory?.serviceType === 0 ? differenceInDays(checkOutDate, checkInDate) : 1;
        const selectPrice = services.prices.find((item) => item.id == selectPriceId);

        let total = 0;
        total = total + days * selectPrice.priceAmount * Number(quantity);
        if (total < 0) {
            total = 0;
        }
        if (selectMiniServiceId) {
            const selectMiniService = services.miniServices.find((item) => item.id == selectMiniServiceId);

            if (selectMiniService) {
                methods.setValue('miniServiceId', selectMiniService.id);

                total = total + selectMiniService.price * Number(quantity) * days;
            }
        } else {
            methods.setValue('miniServiceId', 0);
        }
        methods.setValue('priceId', selectPriceId);
        methods.setValue('price', total);
    }, [services, watchServiceStartDate, watchServiceEndDate, selectPriceId, selectMiniServiceId, quantity]);

    const createBookingMutation = useMutation(async (input) => {
        return await axios.post(`https://apis20231023230305.azurewebsites.net/api/CartDetail/CreateCartDetail`, {
            ...input,
        });
    });

    const onSubmit = (data, isRedirect = true) => {
        if (data.quantity <= 0) {
            toast.error('Quantity must be greater than 0');
            return;
        }

        if (services?.serviceCategory?.serviceType === 0) {
            if (
                data.serviceStartDate !== null &&
                data.serviceEndDate !== null &&
                data.serviceStartDate >= data.serviceEndDate
            ) {
                toast.error('Check-out date must be after check-in date');
                return;
            }

            if (data.serviceStartDate < format(new Date(), 'yyyy-MM-dd')) {
                toast.error('Check-in date must be after today');
                return;
            }
        }

        const isConfirmed = window.confirm(`Are you sure you want to book ${services.birdServiceName}?`);

        if (!isConfirmed) {
            return;
        }

        createBookingMutation.mutate(data, {
            onSuccess: (data) => {
                toast.success('Booking Successful');
                console.log(data);
                setTimeout(() => {
                    isRedirect ? navigate('/order-cart') : navigate('/service');
                }, 1000);
            },
        });
    };

    return (
        <FormProvider {...methods}>
            <div className="flex items-start justify-center min-h-screen py-10">
                <div className="flex flex-col w-full max-w-6xl gap-10">
                    <button onClick={() => window.history.back()} className="back-button">
                        <FaArrowLeft />
                    </button>
                    <h2 className="mb-2 font-bold">
                        Booking Form for: {services ? services.birdServiceName : 'No item selected'}
                    </h2>
                    <form className="grid grid-cols-3 gap-3" onSubmit={methods.handleSubmit(onSubmit)}>
                        {/* <div className="col-span-1">
                        <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            // value={formData.username}
                            // onChange={handleInputChange}
                            {...methods.register('username', { required: true })}
                            required
                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div> */}
                        {/* <div className="col-span-1">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            // value={formData.email}
                            // onChange={handleInputChange}
                            {...methods.register('email', { required: true })}
                            required
                            className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div> */}
                        {/* <div className="col-span-1">
                        <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                            Phone:
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            // value={formData.phone}
                            // onChange={handleInputChange}
                            {...register('phone', { required: true })}
                            required
                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div> */}
                        {services?.serviceCategory?.serviceType === 0 && (
                            <>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="serviceStartDate"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Check-In Date:
                                    </label>
                                    <input
                                        type="date"
                                        name="serviceStartDate"
                                        id="serviceStartDate"
                                        // value={formData.checkInDate}
                                        // onChange={handleInputChange}
                                        {...methods.register('serviceStartDate', { required: true })}
                                        required
                                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <FormError name="serviceStartDate" />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="serviceEndDate"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Check-Out Date:
                                    </label>
                                    <input
                                        type="date"
                                        name="serviceEndDate"
                                        id="serviceEndDate"
                                        // value={formData.checkOutDate}
                                        // onChange={handleInputChange}
                                        {...methods.register('serviceEndDate', { required: true })}
                                        required
                                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <FormError name="serviceEndDate" />
                                </div>
                            </>
                        )}

                        <div className="col-span-1">
                            <label
                                htmlFor="selectedOption"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Select an Option of your bird size:
                            </label>
                            <select
                                className="block w-full px-4 py-2.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectPriceId}
                                onChange={(e) => setSelectPriceId(e.target.value)}
                                required
                            >
                                {selectPriceOption.map((option) => (
                                    <option key={option.name} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="selectedOption"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Mini Service:
                            </label>
                            <select
                                className="block w-full px-4 py-2.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectMiniServiceId}
                                onChange={(e) => setSelectMiniServiceId(e.target.value)}
                                required
                            >
                                <option selected value="0">
                                    Select an option
                                </option>
                                {selectMiniServiceOption.map((option) => {
                                    return (
                                        <option key={option.name} value={option.value}>
                                            {option.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="selectedOption"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Quantity:
                            </label>
                            <input
                                type="number"
                                {...methods.register('quantity', { required: true })}
                                min={1}
                                required
                                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="col-span-3">
                            <label
                                htmlFor="description"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Note:
                            </label>
                            <div className="">
                                <textarea
                                    {...methods.register('description', { required: true })}
                                    rows={4}
                                    id="description"
                                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-full col-span-3 border-t border-gray-400 border-solid" />
                        <div className="flex flex-col items-end justify-end col-span-3 gap-10 mt-4">
                            <p className="flex justify-between w-full max-w-xs text-xl font-bold text-black rounded-lg">
                                <span>Total</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => onSubmit(methods.getValues(), false)}
                                    className="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm w-fit hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm w-fit hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};

export default BookingHotel;
