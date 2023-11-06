import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

import * as Yup from 'yup';
import axios from 'axios';
import CTAUploadFile from '../../../Components/CTA/CTAUploadFile';
import { birdSizeOptions, birdTypeOptions, locationOptions } from '../../../models/bird';
import { useMutation, useQuery } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormError from '../../../Components/FormError/FormError';
import { toast } from 'react-toastify';

const CreateServicePage = () => {
    const router = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const validationSchema = Yup.object().shape({
        birdServiceName: Yup.string().required('Service name is required'),
        imageURL: Yup.string().required('Picture is required'),
        videoURL: Yup.string().required('Video is required'),
        description: Yup.string().required('description is required'),
        prices: Yup.array()
            .min(1, 'At least one birdType must be added to Size Data')
            .of(
                Yup.object().shape({
                    serviceType: Yup.string().required('serviceType is required'),
                    priceName: Yup.string().required('priceName Price is required'),
                    birdSize: Yup.string().required('birdSize Price is required'),
                    birdType: Yup.string().required('birdType Price is required'),
                    priceAmount: Yup.string().required('priceAmount Price is required'),
                    priceType: Yup.string().required('priceType Price is required'),
                })
            ),
        miniServices: Yup.array()
            .min(0, 'Must have at least one mini service')
            .max(1, "Can't have more than one mini service")
            .of(
                Yup.object().shape({
                    miniServiceName: Yup.string().required('miniServiceName is required'),
                    description: Yup.string().required('description is required'),
                    price: Yup.string().required('price is required'),
                })
            ),
    });

    const formMethods = useForm({
        defaultValues: {
            birdServiceName: '',
            location: 0,
            imageURL: '',
            videoURL: '',
            description: '',
            providerId: 0,
            prices: [],
            miniServices: [],
        },
        resolver: yupResolver(validationSchema),
    });
    console.log('validationSchema', formMethods.formState.errors);

    const prices = formMethods.watch('prices');
    const miniServices = formMethods.watch('miniServices');
    const serviceCategorySelectId = formMethods.watch('serviceCategorySelectId');

    const providerQuery = useQuery(
        ['provider', user?.id],
        async () => {
            const res = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetByProviderId?id=${user?.id}`
            );
            return res.data.result;
        },
        {
            enabled: user !== null,
            onSuccess: (data) => {
                formMethods.setValue('providerId', data.id);
            },
        }
    );

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));

        setUser(user);
    }, []);

    const serviceTypeAfterQuery = useQuery(
        ['serviceType', serviceCategorySelectId],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/ServiceCategory/GetByServiceType?type=' +
                    serviceCategorySelectId
            );

            return res.data.result;
        },
        {
            enabled: serviceCategorySelectId !== '',
            initialData: [],
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                if (data.length === 0) return;
                formMethods.setValue('serviceCategoryId', data[0].id);
            },
        }
    );

    const [error, setError] = useState(null);

    // const formMethods = useFormik({
    //     initialValues: {
    //         birdServiceName: '',
    //         description: '',
    //         imageURL: '',
    //         videoURL: '',
    //         serviceCategoryId: serviceCateId,
    //         providerId: proId,
    //         prices: [],
    //     },
    //     validationSchema: validationSchema,
    //     onSubmit: async (values) => {
    //         await sleep(500);

    //         const { birdServiceName, description, imageURL, videoURL, prices, location } = values;
    //         const newObj = {
    //             birdServiceName,
    //             description,
    //             imageURL,
    //             videoURL,
    //             serviceCategoryId: serviceCateId,
    //             providerId: proId,
    //             prices,
    //             location,
    //         };

    //         createService(newObj);
    //     },
    // });

    const createService = useMutation(
        async (data) => {
            const response = await axios.post('https://apis20231023230305.azurewebsites.net/api/BirdService/Create', {
                ...data,
                location: Number(data.location),
                serviceCategoryId: Number(data.serviceCategoryId),
                prices: data.prices.map((item) => ({
                    serviceType: Number(item.serviceType),
                    birdSize: Number(item.birdSize),
                    birdType: Number(item.birdType),
                    priceAmount: Number(item.priceAmount),
                    priceType: 0,
                    priceName: item.priceName,
                })),
                miniServices:
                    data.miniServices.length > 0
                        ? [
                              {
                                  miniServiceName: data.miniServices[0].miniServiceName,
                                  description: data.miniServices[0].description,
                                  price: Number(data.miniServices[0].price),
                              },
                          ]
                        : null,
            });

            return response;
        },
        {
            onSuccess: (data) => {
                toast.success('Create service successfully');
                router('/my-shop');
            },
            onError: (error) => {
                toast.error('Create service failed');
            },
        }
    );

    if (isLoading) {
        return (
            <div role="status" className="flex justify-center align-middle">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const serviceTypeQuery = useQuery(
        ['serviceType'],
        async () => {
            const res = await axios.get(
                'https://apis20231023230305.azurewebsites.net/api/ServiceCategory/Get?pageIndex=0&pageSize=9999'
            );

            return res.data.result.items;
        },
        {
            initialData: [],
        }
    );

    const serviceCategory = [
        { value: 0, label: 'Boarding' },
        { value: 1, label: 'Grooming' },
        { value: 2, label: 'Healthcare' },
    ];

    return (
        <FormProvider {...formMethods}>
            <div className="flex justify-center w-full gap-4">
                <div className="p-4 bg-white rounded-lg shadow-lg w-96 h-fit ring-1">
                    <CTAUploadFile description="Upload your service image here" />
                </div>
                <div className="w-full max-w-5xl p-4 rounded-lg ring-1">
                    <h1 className="text-2xl font-bold text-center mb-7">Add New Service</h1>

                    <form
                        className="flex flex-col gap-3"
                        onSubmit={formMethods.handleSubmit((data) => {
                            createService.mutate(data);
                        })}
                    >
                        <h2 className="text-lg font-semibold leading-7 text-gray-900 ">Service Information</h2>
                        <div className="grid grid-cols-6 gap-3">
                            <div className="flex flex-col col-span-2">
                                <label
                                    htmlFor="birdServiceName"
                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                >
                                    Service name
                                </label>
                                <input
                                    placeholder="Service name"
                                    {...formMethods.register('birdServiceName')}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FormError name="birdServiceName" />
                            </div>

                            <div className="flex flex-col col-span-2">
                                <label
                                    htmlFor="serviceLocation"
                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                >
                                    Location
                                </label>

                                <select
                                    {...formMethods.register('location')}
                                    placeholder="Select location"
                                    className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {locationOptions.map(({ value, label }, index) => (
                                        <option key={index} value={Number(value)}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                <FormError name="location" />
                            </div>
                            <div className="flex flex-col col-span-1">
                                <label
                                    htmlFor="serviceType"
                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                >
                                    Type Name
                                </label>
                                <select
                                    {...formMethods.register(`serviceCategorySelectId`)}
                                    id="serviceCategorySelectId"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    {serviceCategory.map(({ value, label }, index) => (
                                        <option key={index} value={Number(value)}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                <FormError name={`serviceCategorySelectId`} />
                            </div>
                            <div className="flex flex-col col-span-1">
                                <label
                                    htmlFor="serviceType"
                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                >
                                    Service Category
                                </label>
                                <select
                                    {...formMethods.register(`serviceCategoryId`)}
                                    id="serviceCategoryId"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                    {serviceTypeAfterQuery.data.map(({ categoryName, id }, index) => (
                                        <option key={id} value={Number(id)}>
                                            {categoryName}
                                        </option>
                                    ))}
                                </select>
                                <FormError name={`serviceCategoryId`} />
                            </div>
                            <div className="flex flex-col col-span-3">
                                <label
                                    htmlFor="imageURL"
                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                >
                                    Picture URL
                                </label>
                                <input
                                    {...formMethods.register('imageURL')}
                                    placeholder="Link imageURL"
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FormError name="imageURL" />
                            </div>
                            <div className="flex flex-col col-span-3">
                                <label
                                    htmlFor="videoURL"
                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                >
                                    Video URL
                                </label>
                                <input
                                    {...formMethods.register('videoURL')}
                                    placeholder="Link videoURL"
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FormError name="videoURL" />
                            </div>
                            <div className="flex flex-col col-span-full">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                >
                                    Description
                                </label>
                                <textarea
                                    {...formMethods.register('description')}
                                    placeholder="Write your description here"
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>
                                <FormError name="description" />
                            </div>
                        </div>

                        <div className="w-full h-px my-5 bg-gray-400" />
                        <div name="prices">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold leading-7 text-gray-900 ">Category Service</h2>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-4 py-2 text-white duration-300 bg-green-600 rounded-lg hover:bg-green-500"
                                    onClick={() => {
                                        formMethods.setValue('prices', [
                                            ...formMethods.getValues('prices'),
                                            {
                                                serviceType: 0,
                                                birdSize: 0,
                                                birdType: 0,
                                                priceAmount: 0,
                                                priceType: 0,
                                            },
                                        ]);
                                    }}
                                >
                                    <PlusIcon className="w-5 h-5 text-white" />
                                    <span>Add Price</span>
                                </button>
                            </div>
                            <FormError name={`prices`} />
                            <div>
                                {prices.length === 0 && (
                                    <div className="flex items-center justify-center w-full h-32 mt-2 bg-gray-200 rounded-lg">
                                        <span className="text-gray-400">No price added</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                {prices.map((item, index) => (
                                    <div className="grid items-end w-full grid-cols-5 gap-4">
                                        <div className="flex flex-col col-span-1">
                                            <label
                                                htmlFor="priceName"
                                                className="block text-sm font-semibold leading-6 text-gray-800"
                                            >
                                                Price Name
                                            </label>
                                            <input
                                                {...formMethods.register(`prices.${index}.priceName`)}
                                                id="priceName"
                                                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            />

                                            <FormError name={`prices.${index}.priceName`} />
                                        </div>

                                        <div className="flex flex-col col-span-1">
                                            <label
                                                htmlFor="birdSize"
                                                className="block text-sm font-semibold leading-6 text-gray-800"
                                            >
                                                Select Size
                                            </label>
                                            <select
                                                {...formMethods.register(`prices.${index}.birdSize`)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            >
                                                {birdSizeOptions.map(({ value, label }, index) => (
                                                    <option key={index} value={Number(value)}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                            <FormError name={`prices.${index}.birdSize`} />
                                        </div>
                                        <div className="flex flex-col col-span-1">
                                            <label
                                                htmlFor="birdType"
                                                className="block text-sm font-semibold leading-6 text-gray-800"
                                            >
                                                Select Type
                                            </label>
                                            <select
                                                {...formMethods.register(`prices.${index}.birdType`)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            >
                                                {birdTypeOptions.map(({ value, label }, index) => (
                                                    <option key={index} value={Number(value)}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                            <FormError name={`prices.${index}.birdType`} />
                                        </div>

                                        <div className="flex flex-col col-span-1">
                                            <div className="flex flex-col ">
                                                <label
                                                    htmlFor="priceAmount"
                                                    className="block text-sm font-semibold leading-6 text-gray-800"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    {...formMethods.register(`prices.${index}.priceAmount`)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                />
                                            </div>
                                            <FormError name={`prices.${index}.priceAmount`} />
                                        </div>
                                        <div className="flex flex-col col-span-1 py-4">
                                            <div
                                                onClick={() => {
                                                    const price = formMethods.getValues('prices');
                                                    price.splice(index, 1);
                                                    formMethods.setValue('prices', price);
                                                }}
                                            >
                                                <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer fill-white" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <FormError name={`miniServices`} />
                        {miniServices.length > 0 && (
                            <div>
                                <div className="w-full h-px my-5 bg-gray-400" />
                                <div name="miniServices">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold leading-7 text-gray-900 ">Mini Service</h2>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                formMethods.setValue('miniServices', []);
                                            }}
                                        >
                                            <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer fill-white" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col col-span-1">
                                        <div className="flex flex-col ">
                                            <label
                                                htmlFor="priceAmount"
                                                className="block text-sm font-semibold leading-6 text-gray-800"
                                            >
                                                Mini Service Name
                                            </label>
                                            <input
                                                {...formMethods.register(`miniServices[0].miniServiceName`)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            />
                                        </div>
                                        <FormError name={`miniServices[0].miniServiceName`} />
                                    </div>
                                    <div className="flex flex-col col-span-1">
                                        <div className="flex flex-col ">
                                            <label
                                                htmlFor="priceAmount"
                                                className="block text-sm font-semibold leading-6 text-gray-800"
                                            >
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                {...formMethods.register(`miniServices[0].price`)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            />
                                        </div>
                                        <FormError name={`miniServices[0].price`} />
                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        <div className="flex flex-col ">
                                            <label
                                                htmlFor="priceAmount"
                                                className="block text-sm font-semibold leading-6 text-gray-800"
                                            >
                                                Description
                                            </label>
                                        </div>
                                        <textarea
                                            {...formMethods.register(`miniServices[0].description`)}
                                            placeholder="Write your description here"
                                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        ></textarea>
                                        <FormError name={`miniServices[0].price`} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between col-span-3">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-1 text-white duration-300 !bg-green-600 rounded-lg hover:bg-green-500"
                                onClick={() => {
                                    formMethods.setValue('miniServices', [
                                        {
                                            miniServiceName: '',
                                            description: '',
                                            price: 0,
                                        },
                                    ]);
                                }}
                            >
                                <PlusIcon className="w-5 h-5 text-white" />
                                Add Mini Service
                            </button>
                            <div className="flex items-center gap-2">
                                <Link
                                    to={'/my-shop'}
                                    className="items-center block gap-2 px-6 py-3 text-white duration-300 bg-red-600 rounded-lg hover:bg-red-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="items-center block h-full gap-2 px-6 py-3 text-white duration-300 !bg-green-600 rounded-lg hover:bg-green-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};

export default CreateServicePage;
