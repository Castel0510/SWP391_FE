import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const CreateServicePage = () => {



    //
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return (
        <>



            <div>
                <h1>ADD NEW SERVICE</h1>
                <Formik
                    initialValues={{
                        ServiceTitle: '',
                        picture: '',
                        email: '',
                        phone: '',
                        description: '',
                        category: '',
                        serviceData: [{ service: '', size: '', price: '' }],
                    }}
                    onSubmit={async (values) => {
                        await sleep(500);
                        console.log(JSON.stringify(values, null, 2));
                    }}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <div>
                                <label htmlFor="ServiceTitle">Service Title</label><br />
                                <Field name="ServiceTitle" placeholder="Service Title" />
                            </div>
                            <div>
                                <label htmlFor="picture">Picture</label><br />
                                <Field name="picture" placeholder="jane@acme.com" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label><br />
                                <Field name="email" placeholder="jane@acme.com" type="email" />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone Number</label><br />
                                <Field name="phone" placeholder="Doe" />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label><br />
                                <Field as="textarea" name="description" placeholder="Doe" />
                            </div>
                            <div>
                                <label htmlFor="category">Select category</label><br />
                                <Field as="select" name="category">
                                    <option value="">Select an option</option>
                                    <option value="boarding">Boarding</option>
                                    <option value="grooming">Grooming</option>
                                    <option value="medical">Medical</option>
                                </Field>
                            </div>
                            
                            <hr />
                            <br />
                            <br />

                            <FieldArray name="serviceData">
                                {({ push, remove }) => (
                                    <div>
                                        <h3>Service Data</h3>
                                        {values.serviceData.map((data, index) => (
                                            <div key={index}>
                                                <div>
                                                    <label htmlFor={`serviceData.${index}.service`}>Service</label><br />
                                                    <Field name={`serviceData.${index}.service`} />
                                                </div>
                                                <div>
                                                    <label htmlFor={`serviceData.${index}.size`}>Size</label><br />
                                                    <Field as="select" name={`serviceData.${index}.size`}>
                                                        <option value="">Select a size</option>
                                                        <option value="small">&lt;25cm</option>
                                                        <option value="medium">25-50cm</option>
                                                        <option value="large">&gt;50cm</option>
                                                    </Field>
                                                </div>
                                                <div>
                                                    <label htmlFor={`serviceData.${index}.price`}>Price</label><br />
                                                    <Field name={`serviceData.${index}.price`} type="number" />
                                                </div>
                                                {/* Add Button */}
                                                {index === values.serviceData.length - 1 && (
                                                    <button type="button" onClick={() => push({ service: '', size: '', price: '' })}>
                                                        Add
                                                    </button>
                                                )}
                                                {/* Delete Button */}
                                                {index !== values.serviceData.length - 1 && (
                                                    <button type="button" onClick={() => remove(index)}>
                                                        Delete
                                                    </button>
                                                )}
                                                <ErrorMessage name={`serviceData.${index}.service`} component="div" />
                                                <ErrorMessage name={`serviceData.${index}.size`} component="div" />
                                                <ErrorMessage name={`serviceData.${index}.price`} component="div" />
                                            </div>
                                        ))}
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