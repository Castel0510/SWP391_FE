import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrash, BsPlusCircle } from "react-icons/bs";

const CreateServicePage = () => {
    const [data, setData] = useState([{ service: "", size: "", price: "" }]);
    const [img, setImg] = useState(null);
    const [selectedService, setSelectedService] = useState("");

    const handleOnClick = () => {
        setData([...data, { service: "", size: "", price: "" }]);
    };

    const handleOnChange = (e, index) => {
        const { name, value } = e.target;
        const onChangeItem = [...data];
        onChangeItem[index][name] = value;
        setData(onChangeItem);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImg(URL.createObjectURL(file));
    };

    const handleDelete = (item) => {
        const deleteItem = [...data];
        deleteItem.splice(item, 1);
        setData(deleteItem);
    };

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    let serviceTypeOptions = [];
    if (selectedService === "boarding") {
        serviceTypeOptions = [
            { value: "birdsitting", label: "BIRD SITTING" }
        ];
    } else if (selectedService === "grooming") {
        serviceTypeOptions = [
            { value: "nailclipping", label: "NAIL CLIPPING" },
            { value: "breaktrimming", label: "BREAK TRIMMING" },
            { value: "wingclipping", label: "WING CLIPPING" }
        ];
    } else if (selectedService === "medical") {
        serviceTypeOptions = [
            { value: "dnasexing", label: "DNA Sexing" }
        ];
    }

    return (
        <>
            <form>
                <div className="w-fit min-w-[800px]  p-8 bg-white shadow-md rounded my-10 mx-auto">
                    <div className="text-center font-bold text-2xl">ADD NEW SERVICE</div>
                    <div className="rounded p-6 w-full">
                        <div className="pb-6">
                            <label
                                htmlFor="fname"
                                className="font-semibold text-gray-700 block pb-1 w-full"
                            >
                                SERVICE TITLE
                            </label>
                            <input
                                id="fname"
                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                type="text"
                                placeholder="Service Name"
                                required
                            />
                        </div>
                        {/* Image Upload */}
                        <div className="pb-6">
                            <label
                                htmlFor="imageUpload"
                                className="font-semibold text-gray-700 block pb-1 w-full"
                            >
                                SERVICE IMAGE
                            </label>
                            {img && (
                                <img
                                    src={img}
                                    alt="Service"
                                    className="h-16 w-16 rounded-full mr-4"
                                />
                            )}
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="imageUpload"
                                className="cursor-pointer text-blue-500"
                            >
                                {img ? "Change Image" : "Upload Image"}
                            </label>
                        </div>
                        {/* End Image Upload */}
                        <div className="pb-4">
                            <label
                                htmlFor="email"
                                className="font-semibold text-gray-700 block pb-1 w-full"
                            >
                                EMAIL
                            </label>
                            <input
                                id="email"
                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                type="email"
                                placeholder="example@example.com"
                                required
                            />
                        </div>
                        <div className="pb-4">
                            <label
                                htmlFor="tel"
                                className="font-semibold text-gray-700 block pb-1 w-full"
                            >
                                PHONE NUMBER
                            </label>
                            <input
                                id="tel"
                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                type="tel"
                                placeholder="09xxxxxxxx"
                                required
                            />
                        </div>
                        <div className="pb-4">
                            <label
                                htmlFor="desc"
                                className="font-semibold text-gray-700 block pb-1 w-full"
                            >
                                DESCRIPTION
                            </label>
                            <textarea
                                id="desc"
                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                placeholder="Write your description here"
                            />
                        </div>
                    </div>

                    <div className="px-6">
                        <select
                            className="border border-gray-300 rounded px-4 py-2 mr-2"
                            name="service"
                            value={selectedService}
                            onChange={handleServiceChange}
                        >
                            <option value="" disabled>
                                SELECT SERVICE
                            </option>
                            <option value="boarding">BOARDING</option>
                            <option value="grooming">GROOMING</option>
                            <option value="medical">MEDICAL</option>
                        </select>

                        <select
                            className="border border-gray-300 rounded px-4 py-2 mr-2"
                            name="serviceType"
                        >

                            {serviceTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-6">
                        <button
                            className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-6 text-2xl"
                            onClick={handleOnClick}
                        >
                            <BsPlusCircle />
                        </button>
                        {data.map((item, index) => (
                            <div key={index}
                                className="flex mb-2">
                                <input
                                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                                    placeholder="Service"
                                    name="service"
                                    value={item.service}
                                    onChange={(e) => handleOnChange(e, index)}
                                    required
                                />
                                <select
                                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                                    name="size"
                                    value={item.size}
                                    onChange={(e) => handleOnChange(e, index)}
                                    required
                                >
                                    <option value="" disabled>
                                        SELECT SIZE
                                    </option>
                                    <option value="small">SMALL(10-25CM)</option>
                                    <option value="medium">MEDIUM(25-50CM)</option>
                                    <option value="large">LARGE(&gt;50CM)</option>
                                </select>
                                <input
                                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                                    placeholder="Price"
                                    name="price"
                                    value={item.price}
                                    onChange={(e) => handleOnChange(e, index)}
                                    required
                                />
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(index)}
                                >
                                    <BsTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end p-6">
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            <Link to="/my-shop">CANCEL</Link>
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5"
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreateServicePage;