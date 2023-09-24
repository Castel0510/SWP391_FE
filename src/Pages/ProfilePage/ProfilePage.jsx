import React from 'react'
import logo from '../../Assets/Images/logo.png';

const ProfilePage = () => {
  return (
    <>
      <div className="w-fit  p-8 bg-white shadow-md rounded my-10 mx-auto">
        <div className='text-center font-bold'>PROFILE</div>

        <div className="rounded p-6">
          <div className="pb-6 flex">
            <div>
              <label for="name" className="font-semibold text-gray-700 block pb-1">FIRST NAME</label>
              <div className="flex">
                <input id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" defaultValue="First Name" />
              </div>
            </div>
            <div className='ml-4'>
              <label for="name" className="font-semibold text-gray-700 block pb-1">LAST NAME</label>
              <div className="flex">
                <input id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" defaultValue="Last Name" />
              </div>
            </div>

          </div>
          <div className="pb-4">
            <label for="about" className="font-semibold text-gray-700 block pb-1">Email</label>
            <input id="email" className="border-1  rounded-r px-4 py-2 w-full" type="email" defaultValue="example@example.com" />
          </div>
          <div className="pb-4">
            <label for="about" className="font-semibold text-gray-700 block pb-1">PHONE NUMBER</label>
            <input id="email" className="border-1  rounded-r px-4 py-2 w-full" type="email" defaultValue="09xxxxxxxx" />
          </div>
        </div>

        <div className='flex justify-end p-6'>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            CANCEL
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
            SAVE
          </button>
        </div>
      </div>


    </>
  )
}

export default ProfilePage