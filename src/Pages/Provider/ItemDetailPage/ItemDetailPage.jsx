import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

const ItemDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const location = useLocation();
  const item = location.state?.item.id;

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${item}`);
      setData(response.data.result);

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);


  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const validationSchema = Yup.object().shape({
    birdServiceName: Yup.string().required('Service Title is required'),
    picture: Yup.string().required('Picture is required'),
    // category: Yup.string().required('Category is required'),
    // service: Yup.string().required('Service is required'),
    // sizeData: Yup.array()
    //   .min(1, 'At least one size must be added to Size Data')
    //   .of(
    //     Yup.object().shape({
    //       size: Yup.string().required('Size is required'),
    //       sizePrice: Yup.string().required('Size Price is required'),
    //     })
    //   ),
  });


  // const sizeData = item.sizeData.map((sizeItem) => ({
  //   size: sizeItem.size,
  //   sizePrice: sizeItem.sizePrice,
  // }));

  if (isLoading) {
    return (
      <div role="status" className='flex justify-center align-middle'>
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!item) {
    return <div>Item not founds</div>;
  }

  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-1/2 ring-1 p-4">
          <h1 className="font-bold mb-7 text-center text-2xl">EDIT SERVICE</h1>
          <Formik
            initialValues={{
              birdServiceName: data.birdServiceName,
              description: data.description,
              picture: data.imageURL,
              videoURL: data.videoURL,
              category: data.category,
              service: data.service,
              sizeData: "a",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await sleep(500);
              console.log(JSON.stringify(values, null, 2));
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="birdServiceName"
                    className="font-bold mb-2">Service Title</label>
                  <Field
                    name="birdServiceName"
                    id="birdServiceName"
                    placeholder="Service Title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                  <ErrorMessage
                    name="birdServiceName"
                    component="div"
                    className="text-red-500"
                  />
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
                    htmlFor="videoURL"
                    className="font-bold mb-2">Video</label>
                  <Field
                    name="videoURL"
                    id="videoURL"
                    placeholder="Link videoURL"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="picture"
                    className="font-bold mb-2">Picture</label>
                  <Field
                    name="picture"
                    id="picture"
                    placeholder="Link picture"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                  <ErrorMessage
                    name="picture"
                    component="div"
                    className="text-red-500"
                  />
                </div>


                {/* <div className="flex flex-col mb-4">
                  <label htmlFor="category" className="font-bold mb-2">
                    Select category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="">Select an option</option>
                    <option value="Boarding">Boarding</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Healcare">Healthcare</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label htmlFor="service" className="font-bold mb-2">
                    Select service
                  </label>
                  <Field
                    as="select"
                    name="service"
                    id="service"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="">Select an option</option>
                    {values.category === "Boarding" && (
                      <option value="Bird sitting">Bird sitting</option>
                    )}
                    {values.category === "Grooming" && (
                      <>
                        <option value="Nail clipping">Nail clipping</option>
                        <option value="Wing clipping">Wing clipping</option>
                        <option value="Beak trimming">Beak trimming</option>
                      </>
                    )}
                    {values.category === "Healcare" && (
                      <option value="DNA sexing">DNA Sexing</option>
                    )}
                  </Field>
                  <ErrorMessage
                    name="service"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <FieldArray name="sizeData">
                  {({ push, remove }) => (
                    <div>
                      <div className="flex mt-10">
                        <div className="flex flex-col mb-4">
                          <label htmlFor="size" className="font-bold mb-2">
                            Size
                          </label>
                          <Field
                            as="select"
                            name="size"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value="">Select a size</option>
                            <option
                              value="Small"
                            disabled={values.sizeData.some((data) => data.size === "Small")}
                            >
                              Small
                            </option>
                            <option
                              value="Medium"
                            disabled={values.sizeData.some((data) => data.size === "Medium")}
                            >
                              Medium
                            </option>
                            <option
                              value="Large"
                            disabled={values.sizeData.some((data) => data.size === "Large")}
                            >
                              Large
                            </option>
                          </Field>
                        </div>

                        <div className="overflow-hidden mx-5">
                          <div className="flex flex-col mb-4">
                            <label htmlFor="sizePrice" className="font-bold mb-2">
                              Size Price
                            </label>
                            <Field
                              name="sizePrice"
                              placeholder="Enter price for selected size"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <ErrorMessage
                              name="sizePrice"
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="float-right cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 max-h-11 mt-[25px]"
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
                          <BsPlusCircle />
                        </button>
                      </div>
                      {values.sizeData.map((data, index) => (
                        <div key={index} className="overflow-hidden flex my-7">
                          <div className="flex flex-col mb-4">
                            <Field
                              name={`sizeData.${index}.size`}
                              value={data.size}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col mb-4 mx-6">
                            <Field
                              name={`sizeData.${index}.sizePrice`}
                              value={data.sizePrice}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                <ErrorMessage
                  name="sizeData"
                  component="div"
                  className="text-red-500"
                /> */}




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

export default ItemDetailPage;