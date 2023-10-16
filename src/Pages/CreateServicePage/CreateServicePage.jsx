import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const CreateServicePage = () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return (
        <>
            <div>
                <h1>ADD NEW SERVICE</h1>
                <Formik
                    initialValues={{
                        ServiceTitle: "",
                        picture: "",
                        email: "",
                        phone: "",
                        description: "",
                        category: "",
                        sizeData: [{ size: "", sizePrice: "" }],
                        serviceData: [{ service: "", price: "" }],
                    }}
                    onSubmit={async (values) => {
                        await sleep(500);
                        console.log(JSON.stringify(values, null, 2));
                    }}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div>
                                <label htmlFor="ServiceTitle">Service Title</label>
                                <br />
                                <Field name="ServiceTitle" placeholder="Service Title" />
                            </div>
                            <div>
                                <label htmlFor="picture">Picture</label>
                                <br />
                                <Field name="picture" placeholder="jane@acme.com" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <br />
                                <Field name="email" placeholder="jane@acme.com" type="email" />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone Number</label>
                                <br />
                                <Field name="phone" placeholder="Doe" />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <br />
                                <Field as="textarea" name="description" placeholder="Doe" />
                            </div>
                            <div>
                                <label htmlFor="category">Select category</label>
                                <br />
                                <Field as="select" name="category">
                                    <option value="">Select an option</option>
                                    <option value="boarding">Boarding</option>
                                    <option value="grooming">Grooming</option>
                                    <option value="medical">Medical</option>
                                </Field>
                            </div>

                            <FieldArray name="sizeData">
                                {({ push, remove }) => (
                                    <div>
                                        {values.sizeData.map((data, index) => (
                                            <div key={index}>
                                                <div>
                                                    <label htmlFor={`sizeData.${index}.size`}>Size</label>
                                                    <br />
                                                    <Field
                                                        component="select"
                                                        name={`sizeData.${index}.size`}
                                                        placeholder="Size"
                                                        disabled={data.size !== ""}
                                                    >
                                                        <option value="" disabled={!data.size}>Select Size</option>
                                                        <option value="S" disabled={values.sizeData.some(item => item.size === "S")}>Small</option>
                                                        <option value="M" disabled={values.sizeData.some(item => item.size === "M")}>Medium</option>
                                                        <option value="L" disabled={values.sizeData.some(item => item.size === "L")}>Large</option>
                                                    </Field>
                                                </div>
                                                <div>
                                                    <label htmlFor={`sizeData.${index}.sizePrice`}>Size Price</label>
                                                    <br />
                                                    <Field
                                                        name={`sizeData.${index}.sizePrice`}
                                                        placeholder="Size Price"
                                                        readOnly
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    disabled={values.sizeData.length === 1}
                                                >
                                                    Delete size
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                push({ size: "", sizePrice: "" });
                                            }}
                                            disabled={values.sizeData.some(item => item.size === "S") && values.sizeData.some(item => item.size === "M") && values.sizeData.some(item => item.size === "L")}
                                        >
                                            Add size
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            <FieldArray name="serviceData">
                                {({ push, remove }) => (
                                    <div>
                                        {values.serviceData.map((data, index) => (
                                            <div key={index}>
                                                <div>
                                                    <label htmlFor={`serviceData.${index}.service`}>Service</label>
                                                    <br />
                                                    <Field name={`serviceData.${index}.service`} placeholder="Service" />
                                                </div>
                                                <div>
                                                    <label htmlFor={`serviceData.${index}.price`}>Price</label>
                                                    <br />
                                                    <Field name={`serviceData.${index}.price`} placeholder="Price" />
                                                </div>
                                                <button type="button" onClick={() => remove(index)}>
                                                    Delete service
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push({ service: "", price: "" })}>
                                            Add service
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default CreateServicePage;