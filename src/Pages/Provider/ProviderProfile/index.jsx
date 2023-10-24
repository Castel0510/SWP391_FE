import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import avatar_tmp from '../../../Assets/Images/bird_hero.png'
import { LiaSuitcaseRollingSolid } from 'react-icons/lia'
import { AiOutlineEdit, AiFillCamera } from 'react-icons/ai'
import './style.scss'
import ProviderUpdateProfile from '../ProviderUpdateProfile';
import { getUserInfoInLocalStorage } from '../../../Store/userSlice';

const ProviderProfile = () => {

  const [user, setUser] = useState('')

  const dataUser = useSelector((state) => state.user);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  useEffect(() => {
    setUser(getUserInfoInLocalStorage());
  }, [dataUser]);

  const updateUser = (newUserData) => {

    setUser(newUserData);
    setShowUpdateProfile(false);
  }

  const handleEditProfileClick = () => {
    setShowUpdateProfile(true);
  }

  return (

    <div className="flex flex-col justify-center items-start bg-white md:flex-row">
      <div className='p-4 flex h-full flex-col justify-center items-center gap-5 '>
        <div className="img-avatar">
          <img className="object-cover w-full ring-1 ring-gray-300 md:h-auto md:w-48 md:rounded-none" src={avatar_tmp} alt="" />

          <div className="hidden absolute bottom-0 right-0 bg-white p-2">
            <AiFillCamera className="w-5 h-5" />
          </div>
        </div>
        <div className='flex gap-1 justify-center items-center'>
          <LiaSuitcaseRollingSolid className='text-xl text-emerald-700' />
          <p className='text-center'>
            <span className='text-emerald-700 font-bold text-center text-2xl'>45 </span>
            orders
          </p>
        </div>

      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details about you:
              </p>
            </div>

            <div className='flex cursor-pointer gap-2 text-gray-400'
              onClick={handleEditProfileClick}
            >
              <AiOutlineEdit className="w-5 h-5" />
              <p>Edit profile</p>
            </div>

            {showUpdateProfile
              &&
              <ProviderUpdateProfile
                user={user}
                updateUser={updateUser}
                onClose={() => setShowUpdateProfile(false)}
              />
            }

          </div>

          <div className="border-t border-gray-200">
            <dl>

              <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.fullname}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.email === 'string' ? 'havenprovider@gmail.com' : user?.email }
                </dd>
              </div>

              <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.phoneNumber === 0 ? '0586123859' : user?.phoneNumber}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  TP.HCM
                </dd>
              </div>

              <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  About
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  At Bird Haven, we are dedicated to bringing the joy of avian companionship to your life. As a premier bird shop, we offer a wide range of services and products to cater to bird enthusiasts of all kinds. Whether you're an experienced avian aficionado or just starting your journey with feathered friends, we have something for everyone
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProviderProfile