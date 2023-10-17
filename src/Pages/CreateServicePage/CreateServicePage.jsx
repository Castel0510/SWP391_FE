import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const CreateServicePage = () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return (
        <>
            <div className="w-full flex justify-center ">
                <div className="w-1/2 ring-1 p-4">
                    <h1 className="font-bold mb-7 text-center text-2xl">ADD NEW SERVICE</h1>
                    <Formik
                        initialValues={{
                            ServiceTitle: "",
                            picture: "",
                            email: "",
                            phone: "",
                            description: "",
                            category: "",
                            sizeData: [],
                            serviceData: [{ service: "", price: "" }],
                        }}
                        onSubmit={async (values) => {
                            await sleep(500);
                            console.log(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="ServiceTitle"
                                        className="font-bold mb-2">Service Title</label>
                                    <Field
                                        name="ServiceTitle"
                                        id="ServiceTitle"
                                        placeholder="Service Title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="picture"
                                        className="font-bold mb-2">Picture</label>
                                    <Field
                                        name="picture"
                                        placeholder="jane@acme.com"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="email"
                                        className="font-bold mb-2">Email</label>
                                    <Field
                                        name="email"
                                        id="email"
                                        placeholder="mail@gmail.com"
                                        type="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="phone"
                                        className="font-bold mb-2">Phone Number</label>
                                    <Field
                                        name="phone"
                                        id="phone"
                                        placeholder="Phone number"
                                        type="tel"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
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
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        htmlFor="category"
                                        className="font-bold mb-2">Select category</label>
                                    <Field
                                        as="select"
                                        name="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                        <option value="">Select an option</option>
                                        <option value="boarding">Boarding</option>
                                        <option value="grooming">Grooming</option>
                                        <option value="medical">Medical</option>
                                    </Field>
                                </div>

                                <FieldArray name="sizeData">
                                    {({ push, remove }) => (
                                        <div>
                                            <div className="flex mt-10">
                                                <div className="flex flex-col mb-4">
                                                    <label
                                                        htmlFor="size"
                                                        className="font-bold mb-2">Size</label>
                                                    <Field
                                                        as="select"
                                                        name="size"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                                        <option value="">Select a size</option>
                                                        <option value="Small" disabled={values.sizeData.some((data) => data.size === "Small")}>
                                                            Small
                                                        </option>
                                                        <option value="Medium" disabled={values.sizeData.some((data) => data.size === "Medium")}>
                                                            Medium
                                                        </option>
                                                        <option value="Large" disabled={values.sizeData.some((data) => data.size === "Large")}>
                                                            Large
                                                        </option>
                                                    </Field>
                                                </div>

                                                <div className="overflow-hidden mx-5">
                                                    <div className="flex flex-col mb-4">
                                                        <label
                                                            htmlFor="sizePrice"
                                                            className="font-bold mb-2">Size Price</label>
                                                        <Field
                                                            name="sizePrice"
                                                            placeholder="Enter price for selected size"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                        />
                                                    </div>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="float-right cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 max-h-11 mt-[25px]"
                                                    onClick={() => {
                                                        const exists = values.sizeData.some((data) => data.size === values.size);
                                                        if (!exists) {
                                                            push({ size: values.size, sizePrice: values.sizePrice });
                                                            setFieldValue("size", "");
                                                            setFieldValue("sizePrice", "");
                                                        }
                                                    }}
                                                    disabled={values.size === "" || values.sizePrice === ""}
                                                >
                                                    Add size
                                                </button>
                                            </div>
                                            {values.sizeData.map((data, index) => (
                                                <div key={index} className="overflow-hidden flex my-7">
                                                    <div className="flex flex-col mb-4">
                                                        {/* <label
                                                            htmlFor={`sizeData.${index}.size`}
                                                            className="font-bold mb-2">Size</label> */}
                                                        <Field
                                                            name={`sizeData.${index}.size`}
                                                            value={data.size}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                            readOnly />
                                                    </div>
                                                    <div className="flex flex-col mb-4 mx-6">
                                                        {/* <label
                                                            htmlFor={`sizeData.${index}.price`}
                                                            className="font-bold mb-2">Price</label> */}
                                                        <Field
                                                            name={`sizeData.${index}.price`}
                                                            value={data.sizePrice}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                            readOnly />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="float-right cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                        onClick={() => remove(index)}>
                                                        Delete size
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>


                                <FieldArray name="serviceData">
                                    {({ push, remove }) => (
                                        <div>
                                            <button
                                                type="button"
                                                className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                onClick={() => push({ service: "", price: "" })}>
                                                Add service
                                            </button>
                                            {values.serviceData.map((data, index) => (
                                                <div key={index}>
                                                    <div className="flex flex-col mb-4">
                                                        <label
                                                            htmlFor={`serviceData.${index}.service`}
                                                            className="font-bold mb-2">Service</label>
                                                        <Field name={`serviceData.${index}.service`} placeholder="Service" />
                                                    </div>
                                                    <div className="flex flex-col mb-4">
                                                        <label
                                                            htmlFor={`serviceData.${index}.price`}
                                                            className="font-bold mb-2">Price</label>
                                                        <Field name={`serviceData.${index}.price`} placeholder="Price" />
                                                    </div>
                                                    <button type="button" onClick={() => remove(index)}>
                                                        Delete service
                                                    </button>
                                                </div>
                                            ))}

                                        </div>
                                    )}
                                </FieldArray>

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