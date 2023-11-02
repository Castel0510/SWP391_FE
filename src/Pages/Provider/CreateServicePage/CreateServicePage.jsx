import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CTAUploadFile from '../../../Components/CTA/CTAUploadFile';
import { birdSizeOptions, birdTypeOptions, locationOptions } from '../../../models/bird';

const CreateServicePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [serviceCateList, setServiceCateList] = useState([]);
    const [serviceCateId, setServiceCateId] = useState(null);
    const [proId, setProId] = useState();

    const items = JSON.parse(localStorage.getItem('userInfo'));

    const createService = async (data) => {
        try {
            setIsLoading(true);

            const response = await axios.post(
                'https://apis20231023230305.azurewebsites.net/api/BirdService/Create',
                data
            );

            // Handle the response according to your requirements
            console.log(response.data);

            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const serviceCate = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/ServiceCategory/Get?pageIndex=0&pageSize=9999`
            );
            setServiceCateList(response?.data?.result?.items);

            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        serviceCate();
        setProId(items.id);
    }, []);

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

    const handleTakeServiceCateId = (value) => {
        setServiceCateId(() => value);
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
    });

    const serviceCategory = [
        { value: 0, label: 'Boarding' },
        { value: 1, label: 'Grooming' },
        { value: 2, label: 'Healthcare' },
    ];

    const birdSize = [
        { value: 0, label: 'Chim cảnh' },
        { value: 1, label: 'Chào Mào' },
        { value: 2, label: 'Cu Gáy' },
        { value: 3, label: 'Bồ câu' },
        { value: 4, label: 'Sơn Ca' },
        { value: 5, label: 'Yến Phụng' },
        { value: 6, label: 'Họa Mi' },
        { value: 7, label: 'Vành Khuyên' },
        { value: 8, label: 'Chim Ưng' },
        { value: 9, label: 'Vẹt' },
        { value: 10, label: 'Công' },
        { value: 11, label: 'Quạ' },
        { value: 12, label: 'Chim Sẻ' },
        { value: 13, label: 'Chích Chòe' },
    ];

    const priceType = [
        { value: 0, label: 'Per hour' },
        { value: 1, label: 'Per day' },
        { value: 2, label: 'Per month' },
    ];

    return (
        <>
            <div className="flex justify-center w-full gap-4">
                <div className="p-4 bg-white rounded-lg shadow-lg w-96 h-fit ring-1">
                    <CTAUploadFile description="Upload your service image here" />
                </div>
                <div className="w-full max-w-5xl p-4 rounded-lg ring-1">
                    <h1 className="text-2xl font-bold text-center mb-7">Add New Service</h1>
                    <Formik
                        initialValues={{
                            birdServiceName: '',
                            description: '',
                            imageURL: '',
                            videoURL: '',
                            serviceCategoryId: serviceCateId,
                            providerId: proId,
                            prices: [],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            await sleep(500);

                            const { birdServiceName, description, imageURL, videoURL, prices, location } = values;
                            const newObj = {
                                birdServiceName,
                                description,
                                imageURL,
                                videoURL,
                                serviceCategoryId: serviceCateId,
                                providerId: proId,
                                prices,
                                location,
                            };

                            createService(newObj);
                        }}
                    >
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold leading-7 text-gray-900 ">Service Information</h2>
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="flex flex-col col-span-2">
                                        <label
                                            htmlFor="birdServiceName"
                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                        >
                                            Service name
                                        </label>
                                        <Field
                                            name="birdServiceName"
                                            id="birdServiceName"
                                            placeholder="Service name"
                                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage
                                            name="birdServiceName"
                                            component="div"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>

                                    <div className="flex flex-col col-span-2">
                                        <label
                                            htmlFor="serviceLocation"
                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                        >
                                            Location
                                        </label>
                                        <Field name="location">
                                            {({
                                                field, // { name, value, onChange, onBlur }
                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                meta,
                                            }) => (
                                                <select
                                                    {...field}
                                                    id="serviceLocation"
                                                    placeholder="Select location"
                                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    {locationOptions.map(({ value, label }, index) => (
                                                        <option key={index} value={Number(value)}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="serviceLocation"
                                            component="div"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>

                                    <div className="flex flex-col col-span-3">
                                        <label
                                            htmlFor="imageURL"
                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                        >
                                            Picture URL
                                        </label>
                                        <Field
                                            name="imageURL"
                                            id="imageURL"
                                            placeholder="Link imageURL"
                                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage
                                            name="imageURL"
                                            component="div"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>
                                    <div className="flex flex-col col-span-3">
                                        <label
                                            htmlFor="videoURL"
                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                        >
                                            Video URL
                                        </label>
                                        <Field
                                            name="videoURL"
                                            id="videoURL"
                                            placeholder="Link videoURL"
                                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage
                                            name="videoURL"
                                            component="div"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>
                                    <div className="flex flex-col col-span-full">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                        >
                                            Description
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            id="description"
                                            placeholder="Write your description here"
                                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="mt-1 text-sm text-red-500"
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-px my-5 bg-gray-400" />
                                <FieldArray name="prices">
                                    {({ push, remove }) => (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-lg font-semibold leading-7 text-gray-900 ">
                                                    Category Service
                                                </h2>
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-2 px-4 py-2 text-white duration-300 bg-green-600 rounded-lg hover:bg-green-500"
                                                    onClick={() => {
                                                        console.log(values);
                                                        const exists = values.prices.some(
                                                            (data) => data.birdType === values.birdType
                                                        );
                                                        if (!exists) {
                                                            push({
                                                                serviceType: Number(values.serviceType),
                                                                priceName: values.priceName,
                                                                birdSize: Number(values.birdSize),
                                                                birdType: Number(values.birdType),
                                                                priceAmount: Number(values.priceAmount),
                                                                priceType: 0,
                                                            });
                                                            setFieldValue('serviceType', '');
                                                            setFieldValue('priceName', '');
                                                            setFieldValue('birdSize', '');
                                                            setFieldValue('birdType', '');
                                                            setFieldValue('priceAmount', '0');
                                                            setFieldValue('priceType', '0');
                                                        }
                                                    }}
                                                    disabled={values.birdType === '' || values.priceAmount === ''}
                                                >
                                                    <PlusIcon className="w-5 h-5 text-white" />
                                                    <span>Add Price</span>
                                                </button>
                                            </div>
                                            <div>
                                                <div className="grid w-full grid-cols-5 gap-3">
                                                    <div className="flex flex-col col-span-1">
                                                        <label
                                                            htmlFor="serviceType"
                                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                                        >
                                                            Service type
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="serviceType"
                                                            defaultValue={serviceCategory[0].value}
                                                            id="serviceType"
                                                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                        >
                                                            {serviceCategory.map(({ value, label }, index) => (
                                                                <option key={index} value={Number(value)}>
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>

                                                    <div className="flex flex-col col-span-1">
                                                        <label
                                                            htmlFor="priceName"
                                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                                        >
                                                            Select Price Name
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="priceName"
                                                            id="priceName"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                        >
                                                            {serviceCateList?.map &&
                                                                serviceCateList?.map(
                                                                    (item, index) =>
                                                                        values?.serviceType ===
                                                                            String(item?.serviceType) && ( // Add this condition
                                                                            <option
                                                                                key={index}
                                                                                value={item.categoryName}
                                                                                onChange={handleTakeServiceCateId(
                                                                                    item.id
                                                                                )}
                                                                            >
                                                                                {item.categoryName}
                                                                            </option>
                                                                        )
                                                                )}
                                                        </Field>
                                                    </div>

                                                    <div className="flex flex-col col-span-1">
                                                        <label
                                                            htmlFor="birdSize"
                                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                                        >
                                                            Select Size
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="birdSize"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        >
                                                            <option value="">Select bird</option>
                                                            {birdSizeOptions.map(({ value, label }, index) => (
                                                                <option key={index} value={Number(value)}>
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                    <div className="flex flex-col col-span-1">
                                                        <label
                                                            htmlFor="birdType"
                                                            className="block text-sm font-semibold leading-6 text-gray-800"
                                                        >
                                                            Select Type
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="birdType"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        >
                                                            {birdTypeOptions.map(({ value, label }, index) => (
                                                                <option key={index} value={Number(value)}>
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>

                                                    <div className="flex flex-col col-span-1">
                                                        <div className="flex flex-col mb-4">
                                                            <label
                                                                htmlFor="priceAmount"
                                                                className="block text-sm font-semibold leading-6 text-gray-800"
                                                            >
                                                                Price
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                name="priceAmount"
                                                                placeholder="Enter price "
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <ErrorMessage
                                                    name="prices"
                                                    component="div"
                                                    className="mt-3 text-red-500"
                                                />
                                                {values.prices.map((data, index) => (
                                                    <div key={index} className="flex overflow-hidden my-7">
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[100px]">
                                                            <div
                                                                name={`prices.${index}.serviceType`}
                                                                value={serviceCategory[data.serviceType].label}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[110px]">
                                                            <Field
                                                                name={`prices.${index}.priceName`}
                                                                value={data.priceName}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[110px]">
                                                            <Field
                                                                name={`prices.${index}.birdSize`}
                                                                value={
                                                                    birdSizeOptions.find(
                                                                        (item) => item.value === data.birdType
                                                                    )?.label
                                                                }
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[130px]">
                                                            <Field
                                                                name={`prices.${index}.birdType`}
                                                                value={
                                                                    birdTypeOptions.find(
                                                                        (item) => item.value === data.birdType
                                                                    )?.label
                                                                }
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 min-w-[50px] max-w-[100px]">
                                                            <Field
                                                                name={`prices.${index}.priceAmount`}
                                                                value={data.priceAmount}
                                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[100px]">
                                                            <Field
                                                                name={`prices.${index}.priceType`}
                                                                value={priceType[data.priceType].label}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        {/* <button
                                                            type="button"
                                                            className="float-right px-5 mb-2 mr-2 text-base font-medium text-white bg-red-700 rounded-lg cursor-pointer focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <BsTrash />
                                                        </button> */}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </FieldArray>

                                <div className="flex justify-end col-span-3">
                                    <Link
                                        to={'/my-shop'}
                                        className="float-right cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="float-right cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default CreateServicePage;
