import React from 'react'
import logo from '../../Assets/Images/logo.png';

const ProfilePage = () => {
  return (
    <>
      <form>
        <div className="w-fit  p-8 bg-white shadow-md rounded my-10 mx-auto">
          <div className='text-center font-bold'>PROFILE</div>

          <div className="rounded p-6">
            <div className="pb-6 flex">
              <div>
                <label for="fname" className="font-semibold text-gray-700 block pb-1">FIRST NAME</label>
                <div className="flex">
                  <input id="fname" className="border border-gray-300  rounded px-4 py-2 w-full" type="text" placeholder="First Name" required />
                </div>
              </div>
              <div className='ml-4'>
                <label for="lname" className="font-semibold text-gray-700 block pb-1">LAST NAME</label>
                <div className="flex">
                  <input id="lname" className="border border-gray-300  rounded px-4 py-2 w-full" type="text" placeholder="Last Name" required />
                </div>
              </div>

            </div>
            <div className="pb-4">
              <label for="email" className="font-semibold text-gray-700 block pb-1">Email</label>
              <input id="email" className="border border-gray-300  rounded px-4 py-2 w-full" type="email" placeholder="example@example.com" required />
            </div>
            <div className="pb-4">
              <label for="tel" className="font-semibold text-gray-700 block pb-1">PHONE NUMBER</label>
              <input id="tel" className="border border-gray-300  rounded px-4 py-2 w-full" type="tel" placeholder="09xxxxxxxx" required />
            </div>
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

export default ProfilePage