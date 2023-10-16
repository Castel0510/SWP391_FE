import React, { useEffect, useState } from 'react'

import { getUser } from '../../../Store/userSlice';
import { useSelector } from 'react-redux';
import DropdownUser from '../../DropdownUser';
import logo from '../../../Assets/Images/logo.png'

const NavbarAdminComponent = () => {
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
          <p>Hello admin, </p>
          <DropdownUser fullName={user?.fullName} role={user?.roleName} resetUser={setUser} />
        </div>
      </div>
    </nav>

  );
}

export default NavbarAdminComponent