import React from 'react';
import logo from '../../Assets/Images/logo.png';

const ProfilePage = () => {
    return (
        <>
            <form>
                <div className="p-8 mx-auto my-10 bg-white rounded shadow-md w-fit">
                    <div className="font-bold text-center">PROFILE</div>

                    <div className="p-6 rounded">
                        <div className="flex pb-6">
                            <div>
                                <label for="fname" className="block pb-1 font-semibold text-gray-700">
                                    FIRST NAME
                                </label>
                                <div className="flex">
                                    <input
                                        id="fname"
                                        className="w-full px-4 py-2 border border-gray-300 rounded"
                                        type="text"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="ml-4">
                                <label for="lname" className="block pb-1 font-semibold text-gray-700">
                                    LAST NAME
                                </label>
                                <div className="flex">
                                    <input
                                        id="lname"
                                        className="w-full px-4 py-2 border border-gray-300 rounded"
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pb-4">
                            <label for="email" className="block pb-1 font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                type="email"
                                placeholder="example@example.com"
                                required
                            />
                        </div>
                        <div className="pb-4">
                            <label for="tel" className="block pb-1 font-semibold text-gray-700">
                                PHONE NUMBER
                            </label>
                            <input
                                id="tel"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                type="tel"
                                placeholder="09xxxxxxxx"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end p-6">
                        <button className="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100">
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 ml-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ProfilePage;
