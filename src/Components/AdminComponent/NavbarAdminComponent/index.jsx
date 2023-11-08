import React, { useEffect, useState } from 'react';

import { getUser } from '../../../Store/userSlice';
import { useSelector } from 'react-redux';
import DropdownUser from '../../DropdownUser';
import logo from '../../../Assets/Images/logo.png';

const NavbarAdminComponent = () => {
    const [user, setUser] = useState(null);
    const dataUser = useSelector((state) => state.user);

    useEffect(() => {
        setUser(getUser());
    }, [dataUser]);

    return (
        <nav className="fixed z-20 w-full bg-white border ring-1 navbar-bg-color">
            <div className="flex flex-wrap items-center justify-between p-4 mx-auto">
                <div className="flex items-center">
                    <img src={logo} className="h-8 mr-3" alt="birdlive Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">BIRDLIVE</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <p>Hello admin, </p>
                    <DropdownUser id={user?.Id} role={user?.role} resetUser={setUser} />
                </div>
            </div>
        </nav>
    );
};

export default NavbarAdminComponent;
