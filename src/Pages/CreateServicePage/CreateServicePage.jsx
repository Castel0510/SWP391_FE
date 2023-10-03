import React, { useState } from 'react'

const CreateServicePage = () => {

    const [data, setData] = useState([{ service: "", price: "" }]);

    const handleOnClick = () => {
        setData([...data, { service: "", price: "" }])
    }
    const handleOnChange = (e, index) => {
        const { name, value } = e.target;
        const onChangeItem = [...data];
        onChangeItem[index][name] = value;
        setData(onChangeItem)
    }
    const handleDelete = (item) => {
        const deleteItem = [...data];
        deleteItem.splice(item, 1);
        setData(deleteItem);
    }




    return (
        <>
            <form>
                <div className="w-fit min-w-[800px]  p-8 bg-white shadow-md rounded my-10 mx-auto">
                    <div className='text-center font-bold text-2xl'>CREATE NEW SERVICE</div>
                    <div className="rounded p-6 w-full">
                        <div className="pb-6 ">
                            <label for="fname" className="font-semibold text-gray-700 block pb-1 w-full">SHOP NAME</label>
                            <input id="fname" className="border border-gray-300  rounded px-4 py-2 w-full" type="text" placeholder="Shop Name" required />
                        </div>
                        <div className="pb-4">
                            <label for="email" className="font-semibold text-gray-700 block pb-1 w-full">Email</label>
                            <input id="email" className="border border-gray-300  rounded px-4 py-2 w-full" type="email" placeholder="example@example.com" required />
                        </div>
                        <div className="pb-4">
                            <label for="tel" className="font-semibold text-gray-700 block pb-1 w-full">PHONE NUMBER</label>
                            <input id="tel" className="border border-gray-300  rounded px-4 py-2 w-full" type="tel" placeholder="09xxxxxxxx" required />
                        </div>
                        <div className="pb-4">
                            <label for="desc" className="font-semibold text-gray-700 block pb-1 w-full">DESCRIPTION</label>
                            <textarea id="desc" className="border border-gray-300  rounded px-4 py-2 w-full" type="tel" placeholder="Write your description here" />
                        </div>
                    </div>

                    <div className='p-6'>
                        <button className='text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-6'
                            onClick={handleOnClick}>+</button>

                        {data.map((item, index) => (
                            <div>
                                <input className='border border-gray-300  rounded px-4 py-2 mr-2'
                                    placeholder='Service'
                                    name='service'
                                    value={item.service}
                                    onChange={(e) => handleOnChange(e, index)} />

                                <input className='border border-gray-300  rounded px-4 py-2 mr-2'
                                    placeholder='Price'
                                    name='price'
                                    value={item.price}
                                    onChange={(e) => handleOnChange(e, index)} />
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        ))}
                        {/* <p>{JSON.stringify(data)}</p> */}
                    </div>

                    <div className='flex justify-end p-6'>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            CANCEL
                        </button>
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateServicePage