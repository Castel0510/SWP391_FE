import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';

const ItemDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [serviceCateList, setServiceCateList] = useState([]);
  const [serviceCateId, setServiceCateId] = useState(null);
  const [proId, setProId] = useState();

  const location = useLocation();
  const itemId = location?.state?.item?.id
  console.log("itemId", itemId);

  const itemLocal = JSON.parse(localStorage.getItem("userInfo"));


  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`https://apis20231023230305.azurewebsites.net/api/BirdService/GetById?id=${itemId}`);
      setData(response?.data?.result);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const serviceCate = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`https://apis20231023230305.azurewebsites.net/api/ServiceCategory/Get?pageIndex=0&pageSize=9999`);
      setServiceCateList(response?.data?.result?.items);

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const updateService = async (data) => {
    try {
      const headers = {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      };
      console.log(data);

      setIsLoading(true);

      const response = await axios.put(`https://apis20231023230305.azurewebsites.net/api/BirdService/Update?id=${itemId}`, data, { headers });

      // Handle the response according to your requirements
      console.log(response.data);

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    serviceCate();
    // updateService();
    setProId(itemLocal.id)
  }, []);

  // console.log("serviceCateList: ", serviceCateList);

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

  if (!itemId) {
    return <div>Item not founds</div>;
  }
  const sizeData = item.sizeData.map((sizeItem) => ({
    size: sizeItem.size,
    sizePrice: sizeItem.sizePrice,
  }));

  const handleTakeServiceCateId = (value) => {
    setServiceCateId(() => value);
    console.log('serviceCateId: ', serviceCateId);
  }


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

  const priceMap = (data?.prices && data?.prices?.map(item => (
    {
      serviceType: item.serviceType,
      priceName: item.priceName,
      birdSize: item.birdSize,
      birdType: item.birdType,
      priceAmount: item.priceAmount,
      priceType: item.priceType,
    }
  )))


  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-fit ring-1 p-4">
          <h1 className="font-bold mb-7 text-center text-2xl">EDIT SERVICE</h1>
          <Formik
            initialValues={{
              birdServiceName: data?.birdServiceName,
              description: data?.description,
              imageURL: data?.imageURL,
              videoURL: data?.videoURL,
              serviceCategoryId: serviceCateId,
              providerId: proId,
              prices: priceMap,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await sleep(500);
              console.log(values);
              const { birdServiceName, description, imageURL, videoURL, prices } = values;
              const newObj = { birdServiceName, description, imageURL, videoURL, serviceCategoryId: serviceCateId, providerId: proId, prices };
              // console.log(newObj)
              console.log(JSON.stringify({ newObj }, null, 2));

              const test = { ...newObj };
              // updateService(test);

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
                    name="ServiceTitle"
                    component="div"
                    className="text-red-500"
                  />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                  <ErrorMessage
                    name="email"
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
                    htmlFor="phone"
                    className="font-bold mb-2">Phone Number</label>
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
                            <label htmlFor="priceName" className="font-bold mb-2">
                              Select priceName
                            </label>
                            <Field
                              as="select"
                              name="priceName"
                              id="priceName"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            >
                              <option value="">Select priceName</option>
                              {serviceCateList?.map && serviceCateList?.map((item, index) => (
                                values?.serviceType === String(item?.serviceType) && (  // Add this condition
                                  <option key={index} value={item.categoryName} onChange={handleTakeServiceCateId(item.id)}>
                                    {item.categoryName}
                                  </option>
                                )

                              ))}
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
                                Price($)
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
                                push({ serviceType: Number(values.serviceType), priceName: values.priceName, birdSize: Number(values.birdSize), birdType: Number(values.birdType), priceAmount: Number(values.priceAmount), priceType: Number(values.priceType) });
                                setFieldValue("serviceType", "");
                                setFieldValue("priceName", "");
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
                        {values?.prices?.map((data, index) => (
                          <div key={index} className="overflow-hidden flex my-7">
                            <div className="flex flex-col mb-4 mr-4 max-w-[100px]">
                              <Field
                                name={`prices.${index}.serviceType`}
                                value={serviceCategory[data.serviceType]?.label}
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
                                value={birdSize[data.birdSize]?.label}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                readOnly
                              />
                            </div>
                            <div className="flex flex-col mb-4 mr-4 max-w-[130px]">
                              <Field
                                name={`prices.${index}.birdType`}
                                value={birdType[data.birdType]?.label}
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
                                value={priceType[data.priceType]?.label}
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

export default ItemDetailPage;