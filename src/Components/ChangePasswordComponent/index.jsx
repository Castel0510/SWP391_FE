import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function getUser() {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const ChangePasswordComponent = () => {

  const dataUser = useSelector((state) => state.user);
  const [user, setUser] = useState(null);

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);


  useEffect(() => {
    setUser(getUser());
  }, [dataUser]);

  useEffect(() => {
    if (oldPassword !== '' && password !== '' && confirmPassword !== '') {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [oldPassword, password, confirmPassword]);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('')

    if (email !== user?.email) {
      setError('This is not your email!');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match!');
    } else {
      //có api bỏ vào
    }
  };

  return (

    <div className='w-full flex justify-center my-10'>
      <div className='w-1/2 ring-1 p-4'>
        <h1 className='mb-2 text-4xl'>Change your password</h1>
        <form>
          <div class="mb-6">
            <label for="old-password" class="block mb-2 text-sm font-medium text-gray-900 ">Old password</label>
            <input
              type="password"
              id="old-password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleOldPasswordChange}
              value={oldPassword}
              required />
          </div>

          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">New password</label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handlePasswordChange}
              value={password}
              required />
          </div>

          <div class="mb-6">
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm new password</label>
            <input
              type="password"
              id="confirm-password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              required />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${!isButtonEnabled ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={handleSubmit}
          >
            Change
          </button>
        </form>
      </div>
    </div>



  )
}

export default ChangePasswordComponent