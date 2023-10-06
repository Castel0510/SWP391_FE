import React, { useEffect, useState } from 'react'
import HeroComponent from '../../Components/HeroComponent'
import AboutUsComponent from '../../Components/AboutUsComponent'
import CategoryComponent from '../../Components/CategoryComponent'
import TopBookingServicesComponent from '../../Components/TopBookingServicesComponent'
import Testimonial from '../../Components/Testimonial'
import ContactUsComponent from '../../Components/ContactUsComponent'
import TopBookingServicesComponentOfProvider from '../../Components/TopBookingServicesComponentOfProvider'
import TestimonialForProvider from '../../Components/TestimonialForProvider'

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

const HomePage = () => {
  const [user, setUser] = useState(null);
  const dataUser = useSelector((state) => state.user);

  useEffect(() => {
    setUser(getUser());
  }, [dataUser]);

  return (
    user?.roleName !== 'Provider'
      ? <>
        <HeroComponent />
        <AboutUsComponent />
        <CategoryComponent />
        <TopBookingServicesComponent />
        <Testimonial />
        <ContactUsComponent />
      </>
      :
      <>
        <HeroComponent />
        <TopBookingServicesComponentOfProvider />
        <TestimonialForProvider />
      </>
  )
}

export default HomePage