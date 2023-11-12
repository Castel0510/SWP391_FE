import React, { useState } from 'react';
import Modal from '../../../Components/Shared/Modal';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { updateProvider } from '../../../Store/userSlice';
import { useDispatch } from 'react-redux';
import CTAUploadImage from '../../../Components/CTA/CTAUploadImage';

const ProviderUpdateProfile = (props) => {
    const { user, updateUser, onClose } = props;
    const [fullname, setFullname] = useState(user?.providerName);
    const [email, setEmail] = useState(user?.user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.user?.phoneNumber);
    const [location, setLocation] = useState(user?.destination);
    const [about, setAbout] = useState(user?.description);
    const [image, setImage] = useState(user?.user?.avatarURL);

    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        setOpenModalConfirm(true);
    };

    const handleCloseModal = () => {
        setOpenModalConfirm(false);
    };

    const handleUpdateProfile = () => {
        const updatedUser = {
            ...user,
            providerName: fullname,
            user: {
                ...user.user,
                email: email,
                phoneNumber: phoneNumber,
                image: image,
            },
            destination: location,
            description: about,
        };

        const providerCredentials = {
            providerName: fullname,
            rating: user?.rating,
            destination: location,
            description: about,
            createdAt: user.createdAt,
            user: {
                avatarURL: image,
                fullname: fullname,
                username: user.user.username,
                password: user.user.password,
                email: email,
                dob: user.user.dob,
                phoneNumber: phoneNumber,
                createdAt: user.createdAt,
                gender: user.user.gender,
                status: user.user.status,
                image: image,
                role: user.user.role,
            },
        };

        console.log(providerCredentials);

        dispatch(updateProvider({ id: user.id, providerCredentials })).then((result) => {
            console.log(result);
        });

        updateUser(updatedUser);
        // toast.success('Update profile successfully!')
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-80">
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center  "
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div className="w-full max-w-lg p-5 bg-white">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3 my-6 md:mb-0">
                                    <CTAUploadImage
                                        description="Upload your service image here"
                                        onUpload={(url) => {
                                            setImage(url);
                                        }}
                                        defaultImage={image}
                                    />
                                </div>
                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-full-name"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                                        id="grid-full-name"
                                        name="fullname"
                                        type="text"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-email"
                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <Tooltip id="warning-email" />
                                </div>
                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-phoneNumber"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-phoneNumber"
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-location"
                                    >
                                        Location
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-about"
                                    >
                                        About
                                    </label>
                                    <textarea
                                        className="block w-full h-40 px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-about"
                                        type="text"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-3">
                                <button
                                    onClick={onClose}
                                    className="flex-shrink-0 px-2 py-1 text-sm text-teal-500 border-4 border-transparent rounded hover:text-teal-800"
                                    type="button"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="flex-shrink-0 px-2 py-1 text-sm text-white bg-teal-500 border-4 border-teal-500 rounded hover:bg-teal-700 hover:border-teal-700"
                                    onClick={handleOpenModal}
                                >
                                    Change
                                </button>
                            </div>

                            {openModalConfirm && (
                                <Modal
                                    title={''}
                                    body={'Are you sure want to change this profile?'}
                                    onClose={handleCloseModal}
                                    onAction={handleUpdateProfile}
                                    hiddenFooter={false}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderUpdateProfile;
