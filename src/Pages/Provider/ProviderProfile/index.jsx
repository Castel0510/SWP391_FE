import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import avatar_tmp from '../../../Assets/Images/bird_hero.png';
import { LiaSuitcaseRollingSolid } from 'react-icons/lia';
import { AiOutlineEdit, AiFillCamera } from 'react-icons/ai';
import './style.scss';
import ProviderUpdateProfile from '../ProviderUpdateProfile';
import { getUserInfoInLocalStorage } from '../../../Store/userSlice';
import { useQuery } from 'react-query';
import axios from 'axios';

const ProviderProfile = () => {
    const [user, setUser] = useState('');
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    useEffect(() => {
        setUser(getUserInfoInLocalStorage());
    }, []);

    const providerQuery = useQuery(
        ['user', 'provider', user],
        async () => {
            const user = getUserInfoInLocalStorage();

            const getUser = await axios.get(
                `https://apis20231023230305.azurewebsites.net/api/Provider/GetByProviderId?id=${user?.id}`
            );

            return getUser;
        },
        {
            enabled: !!user,
            onSuccess: (data) => {
                setUser(data.data.result);
            },
        }
    );

    const updateUser = (newUserData) => {
        setUser(newUserData);
        setShowUpdateProfile(false);
        providerQuery.refetch();
    };

    const handleEditProfileClick = () => {
        setShowUpdateProfile(true);
    };

    return (
        <div className="flex flex-col items-start justify-center bg-white md:flex-row">
            <div className="flex flex-col items-center justify-center h-full gap-5 p-4 ">
                <div className="img-avatar">
                    <img
                        className="object-cover w-full ring-1 ring-gray-300 md:h-auto md:w-48 md:rounded-none"
                        src={user?.user?.avatarURL}
                        alt=""
                    />

                    <div className="absolute bottom-0 right-0 hidden p-2 bg-white">
                        <AiFillCamera className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                    {/* <LiaSuitcaseRollingSolid className='text-xl text-emerald-700' />
          <p className='text-center'>
            <span className='text-2xl font-bold text-center text-emerald-700'>45 </span>
            orders
          </p> */}
                </div>
            </div>

            <div className="flex flex-col justify-between p-4 leading-normal">
                <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="flex justify-between px-4 py-5 sm:px-6">
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">Details about you:</p>
                        </div>

                        <div className="flex gap-2 text-gray-400 cursor-pointer" onClick={handleEditProfileClick}>
                            <AiOutlineEdit className="w-5 h-5" />
                            <p>Edit profile</p>
                        </div>

                        {showUpdateProfile && (
                            <ProviderUpdateProfile
                                user={user}
                                updateUser={updateUser}
                                onClose={() => setShowUpdateProfile(false)}
                                onUpdate={updateUser}
                            />
                        )}
                    </div>

                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="px-4 py-5 bg-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.providerName}
                                </dd>
                            </div>

                            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.user?.email === 'string' ? 'havenprovider@gmail.com' : user?.user?.email}
                                </dd>
                            </div>

                            <div className="px-4 py-5 bg-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.user?.phoneNumber === 0 ? '0586123859' : user?.user?.phoneNumber}
                                </dd>
                            </div>

                            {/* <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Location</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.destination && user?.destination !== 'string' ? user?.destination : 'TP.HCM'}
                                </dd>
                            </div> */}

                            <div
                                className="px-4 py-5 bg-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                style={{ minWidth: '640px' }}
                            >
                                <dt className="text-sm font-medium text-gray-500">About</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.description && user?.description !== 'string'
                                        ? user?.description
                                        : "At Bird Haven, we are dedicated to bringing the joy of avian companionship to your life. As a premier bird shop, we offer a wide range of services and products to cater to bird enthusiasts of all kinds. Whether you're an experienced avian aficionado or just starting your journey with feathered friends, we have something for everyone"}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
