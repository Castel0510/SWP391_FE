import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const ProviderBirdType = () => {

    const fakeDataBird = [

        { value: 1, label: 'Chim chích chòe' },
        { value: 2, label: 'Chim sẻ' },
        { value: 3, label: 'Chim đại bàng' },

    ]

    const fakeDataSize = [

        { value: 1, label: '5cm' },
        { value: 2, label: '10cm' },
        { value: 3, label: '15cm' },

    ]


    const initialValues = {
        birdType: [],
        birdSize: []
    };

    const validationSchema = Yup.object().shape({
        birdType: Yup.array().of(
            Yup.object().shape({
                name: Yup.number().required('Name is required'),
            })
        ),
    });

    return (
        <div>
            <h1 className='text-center my-6 font-bold text-2xl'>Bird Type</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    const { birdType, birdSize } = values;
                    console.log(JSON.stringify({ birdType, birdSize }, null, 2));
                    resetForm();
                }}
            >
                {({ values, setFieldValue, resetForm }) => ( // Add setFieldValue and resetForm to the render props
                    <Form>
                        <FieldArray name="birdType">
                            {({ push, remove }) => (
                                <div>
                                    <div>
                                        <Field name="chooseBird" as="select">
                                            <option>Select an option</option>
                                            {fakeDataBird.map(({ value, label }) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                    disabled={values.birdType.some((bird) => bird.name === value)}
                                                >
                                                    {label}
                                                </option>
                                            ))}
                                        </Field>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const selectedOption = values.chooseBird;
                                                push({ name: Number(selectedOption) });
                                                setFieldValue('chooseBird', ''); // Reset the chooseBird field value
                                            }}
                                            disabled={!values.chooseBird}
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {values.birdType.map((bird, index) => (
                                        <div key={index} className='flex my-4'>
                                            <Field
                                                name={`birdType.${index}.name`}
                                                type="text"
                                                readOnly
                                                value={values.birdType[index].name}
                                            >
                                                {({ field }) => (
                                                    <div>
                                                        <label htmlFor={field.name}>{fakeDataBird[field.value - 1].label}</label>
                                                        {/* <input {...field} id={field.name} readOnly /> */}
                                                    </div>
                                                )}
                                            </Field>
                                            <button type="button" onClick={() => remove(index)}>
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>

                        <FieldArray name="birdSize">
                            {({ push, remove }) => (
                                <div>
                                    <div>
                                        <Field name="chooseSize" as="select">
                                            <option>Select an option</option>
                                            {fakeDataSize.map(({ value, label }) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                    disabled={values.birdSize.some((bird) => bird.size === value)}
                                                >
                                                    {label}
                                                </option>
                                            ))}
                                        </Field>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const selectedOption = values.chooseSize;
                                                push({ size: Number(selectedOption) });
                                                setFieldValue('chooseSize', ''); // Reset the chooseSize field value
                                            }}
                                            disabled={!values.chooseSize}
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {values.birdSize.map((bird, index) => (
                                        <div key={index} className='flex my-4'>
                                            <Field
                                                name={`birdSize.${index}.size`}
                                                type="text"
                                                readOnly
                                                value={values.birdSize[index].size}
                                            >
                                                {({ field }) => (
                                                    <div>
                                                        <label htmlFor={field.size}>{fakeDataSize[field.value - 1].label}</label>
                                                        {/* <input {...field} id={field.name} readOnly /> */}
                                                    </div>
                                                )}
                                            </Field>
                                            <button type="button" onClick={() => remove(index)}>
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ProviderBirdType;