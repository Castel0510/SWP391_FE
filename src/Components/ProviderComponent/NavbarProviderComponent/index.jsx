import React, { useEffect, useState } from 'react';
import './style.scss'
import logo from '../../../Assets/Images/logo.png'
import DropdownUser from '../../DropdownUser';
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

const NavbarProviderComponent = () => {

  const [user, setUser] = useState(null);
  const dataUser = useSelector((state) => state.user);

  useEffect(() => {
    setUser(getUser());

  }, [dataUser]);

  return (
    <nav className="bg-white border ring-1 navbar-bg-color fixed w-full z-20">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="birdlive Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">BIRDLIVE</span>
        </div>

        <div className='flex gap-2 items-center justify-center'>
        <p>Hello provider, </p>
          <DropdownUser id={user?.Id} role={user?.role} resetUser={setUser} />
        </div>
      </div>
    </nav>

  );
};

export default NavbarProviderComponent;
