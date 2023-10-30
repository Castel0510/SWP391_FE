import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';


const CreateServicePage = () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const validationSchema = Yup.object().shape({
        birdServiceName: Yup.string().required('Service name is required'),
        imageURL: Yup.string().required('Picture is required'),
        videoURL: Yup.string().required('Video is required'),
        location: Yup.string().required('location is required'),
        description: Yup.string().required('description is required'),
        prices: Yup.array()
            .min(1, 'At least one birdType must be added to Size Data')
            .of(
                Yup.object().shape({
                    serviceType: Yup.string().required('serviceType is required'),
                    service: Yup.string().required('service Price is required'),
                    birdSize: Yup.string().required('birdSize Price is required'),
                    birdType: Yup.string().required('birdType Price is required'),
                    priceAmount: Yup.string().required('priceAmount Price is required'),
                    priceType: Yup.string().required('priceType Price is required'),
                })
            ),
    });

    const location = [
        { value: 1, label: 'Hà Nội' },
        { value: 2, label: 'TP.HCM' },
        { value: 3, label: 'Đà Nẵng' },
        { value: 4, label: 'Cần thơ' },
        { value: 5, label: 'Hải Phòng' },
        { value: 6, label: 'Nghệ An' },
        { value: 7, label: 'Huế' },
    ]


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
    ]

    const birdType = [

        { value: 0, label: 'less than 1kg' },
        { value: 1, label: 'From 1kg to 2kg' },
        { value: 2, label: 'From 3kg to 5kg' },
        { value: 2, label: 'Greater than 5kg' },

    ];

    const priceType = [

        { value: 0, label: 'Per hour' },
        { value: 1, label: 'Per day' },
        { value: 2, label: 'Per month' },

    ];



    return (
        <>
            <div className="w-full flex justify-center ">
                <div className="w-fit ring-1 p-4">
                    <h1 className="font-bold mb-7 text-center text-2xl">ADD NEW SERVICE</h1>
                    <Formik
                        initialValues={{
                            birdServiceName: "",
                            description: "",
                            imageURL: "",
                            videoURL: "",
                            location: Number,
                            prices: [],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            values.location = Number(values.location);
                            await sleep(500);
                            const { birdServiceName, description, imageURL, videoURL, location, prices } = values;
                            console.log(JSON.stringify({ birdServiceName, description, imageURL, videoURL, location, prices }, null, 2));
                        }}
                    >
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="birdServiceName"
                                        className="font-bold mb-2">Service name</label>
                                    <Field
                                        name="birdServiceName"
                                        id="birdServiceName"
                                        placeholder="Service name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    />
                                    <ErrorMessage
                                        name="birdServiceName"
                                        component="div"
                                        className="text-red-500 mt-3"
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="imageURL"
                                        className="font-bold mb-2">Picture URL</label>
                                    <Field
                                        name="imageURL"
                                        id="imageURL"
                                        placeholder="Link imageURL"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    />
                                    <ErrorMessage
                                        name="imageURL"
                                        component="div"
                                        className="text-red-500 mt-3"
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="videoURL"
                                        className="font-bold mb-2">Video URL</label>
                                    <Field
                                        name="videoURL"
                                        id="videoURL"
                                        placeholder="Link videoURL"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    />
                                    <ErrorMessage
                                        name="videoURL"
                                        component="div"
                                        className="text-red-500 mt-3"
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="location"
                                        className="font-bold mb-2">
                                        Location
                                    </label>
                                    <Field
                                        as="select"
                                        name="location"
                                        id="location"
                                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    >
                                        <option>Select location</option>
                                        {location.map(({ value, label }, index) => (
                                            <option
                                                key={index}
                                                value={Number(value)}
                                            >
                                                {label}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="description"
                                        className="font-bold mb-2">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Write your description here"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-red-500 mt-3"
                                    />
                                </div>

                                <div className="min-w-fit">
                                    <FieldArray name="prices">
                                        {({ push, remove }) => (
                                            <div>
                                                <div className="flex mt-10">
                                                    <div className="flex flex-col mb-4 mr-4 min-w-fit">
                                                        <label htmlFor="serviceType" className="font-bold mb-2">
                                                            Service type
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="serviceType"
                                                            id="serviceType"
                                                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                        >
                                                            <option>Select type</option>
                                                            {serviceCategory.map(({ value, label }, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={Number(value)}
                                                                >
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>

                                                    <div className="flex flex-col mb-4 mr-4 min-w-fit">
                                                        <label htmlFor="service" className="font-bold mb-2">
                                                            Select service
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="service"
                                                            id="service"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                        >
                                                            <option value="">Select service</option>
                                                            {values.serviceType === "0" && (
                                                                <option value="bird-sitting">Bird sitting</option>
                                                            )}
                                                            {values.serviceType === "1" && (
                                                                <>
                                                                    <option value="nail-clipping">Nail clipping</option>
                                                                    <option value="wing-clipping">Wing clipping</option>
                                                                    <option value="beak-trimming">Beak trimming</option>
                                                                </>
                                                            )}
                                                            {values.serviceType === "2" && (
                                                                <option value="dna-sexing">DNA Sexing</option>
                                                            )}
                                                        </Field>
                                                    </div>


                                                    <div className="flex flex-col mb-4 mr-4 min-w-fit">
                                                        <label htmlFor="birdSize" className="font-bold mb-2">
                                                            Select bird
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="birdSize"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        >
                                                            <option value="">Select bird</option>
                                                            {birdSize.map(({ value, label }, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={Number(value)}
                                                                >
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                    <div className="flex flex-col mb-4 min-w-fit">
                                                        <label htmlFor="birdType" className="font-bold mb-2">
                                                            Select size
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="birdType"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        >
                                                            <option value="">Select bird</option>
                                                            {birdType.map(({ value, label }, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={Number(value)}
                                                                >
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>

                                                    <div className="overflow-hidden mx-4 max-w-[100px]">
                                                        <div className="flex flex-col mb-4">
                                                            <label htmlFor="priceAmount" className="font-bold mb-2">
                                                                Price
                                                            </label>
                                                            <Field
                                                                name="priceAmount"
                                                                placeholder="Enter price "
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            />

                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col mb-4 min-w-fit mr-4">
                                                        <label htmlFor="priceType" className="font-bold mb-2">
                                                            Select price type
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="priceType"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        >
                                                            <option value="">Select</option>
                                                            {priceType.map(({ value, label }, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={Number(value)}
                                                                >
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="float-right cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 max-h-11 mt-[25px]"
                                                        onClick={() => {
                                                            const exists = values.prices.some((data) => data.birdType === values.birdType);
                                                            if (!exists) {
                                                                push({ serviceType: Number(values.serviceType), service: values.service, birdSize: Number(values.birdSize), birdType: Number(values.birdType), priceAmount: Number(values.priceAmount), priceType: Number(values.priceType) });
                                                                setFieldValue("serviceType", "");
                                                                setFieldValue("service", "");
                                                                setFieldValue("birdSize", "");
                                                                setFieldValue("birdType", "");
                                                                setFieldValue("priceAmount", "0");
                                                                setFieldValue("priceType", "");
                                                            }
                                                        }}
                                                        disabled={values.birdType === "" || values.priceAmount === ""}
                                                    >
                                                        <BsPlusCircle />
                                                    </button>
                                                </div>
                                                <ErrorMessage
                                                    name="prices"
                                                    component="div"
                                                    className="text-red-500 mt-3"
                                                />
                                                {values.prices.map((data, index) => (
                                                    <div key={index} className="overflow-hidden flex my-7">
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[100px]">
                                                            <Field
                                                                name={`prices.${index}.serviceType`}
                                                                value={serviceCategory[data.serviceType].label}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
                                                                readOnly
                                                            />

                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[110px]">
                                                            <Field
                                                                name={`prices.${index}.service`}
                                                                value={data.service}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[110px]">
                                                            <Field
                                                                name={`prices.${index}.birdSize`}
                                                                value={birdSize[data.birdSize].label}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mb-4 mr-4 max-w-[130px]">
                                                            <Field
                                                                name={`prices.${index}.birdType`}
                                                                value={birdType[data.birdType].label}
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
                                                        <button
                                                            type="button"
                                                            className="float-right cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <BsTrash />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>



                                <div className="flex justify-end">
                                    <Link
                                        to={'/my-shop'}
                                        className="float-right cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="float-right cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        disabled={isSubmitting}>
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