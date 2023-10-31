import React, { useState } from 'react'
import Modal from '../../../Components/Shared/Modal';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import { updateProvider } from '../../../Store/userSlice';
import { useDispatch } from 'react-redux';

const ProviderUpdateProfile = (props) => {

    const { user, updateUser, onClose } = props;
    const [fullname, setFullname] = useState(user?.providerName);
    const [email, setEmail] = useState(user?.user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.user?.phoneNumber);
    const [location, setLocation] = useState(user?.destination);
    const [about, setAbout] = useState(user?.description);

    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        setOpenModalConfirm(true)
    }

    const handleCloseModal = () => {
        setOpenModalConfirm(false)
    }

    const handleUpdateProfile = () => {
        const updatedUser = {
            ...user,
            providerName: fullname,
            user: {
                ...user.user,
                email: email,
                phoneNumber: phoneNumber,
            },
            destination: location,
            description: about
        };

        const providerCredentials = {
            providerName: fullname,
            rating: user?.rating,
            destination: location,
            description: about,
            createdAt: user.createdAt,
            user: {
                avatarURL: user.user.avatarURL,
                fullname: fullname,
                username: user.user.username,
                password: user.user.password,
                email: email,
                dob: user.user.dob,
                phoneNumber: phoneNumber,
                createdAt: user.createdAt,
                gender: user.user.gender,
                status: user.user.status,
                image: user.user.image,
                role: user.user.role
            }
        }

        console.log(providerCredentials)

        dispatch(updateProvider({id: user.id, providerCredentials})).then((result) => {
            console.log(result)
        })

        updateUser(updatedUser);
        // toast.success('Update profile successfully!')

    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-80"
        >
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <button type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center  "
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div
                            className="w-full max-w-lg bg-white p-5"
                        >
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-full-name">
                                        Full name
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-full-name"
                                        name="fullname"
                                        type="text"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>

                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-email">
                                        Email
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-phoneNumber">
                                        Phone
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-phoneNumber"
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-location"
                                    >
                                        Location
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>

                                <div className="w-full px-3 my-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-about"
                                    >
                                        About
                                    </label>
                                    <textarea
                                        className="appearance-none block h-40 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-about"
                                        type="text"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end pt-3'>
                                <button onClick={onClose} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                                    Cancel
                                </button>

                                <button
                                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                    onClick={handleOpenModal}
                                >
                                    Change
                                </button>
                            </div>

                            {openModalConfirm
                                &&
                                <Modal
                                    title={''}
                                    body={'Are you sure want to change this profile?'}
                                    onClose={handleCloseModal}
                                    onAction={handleUpdateProfile}
                                    hiddenFooter={false}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ProviderUpdateProfile