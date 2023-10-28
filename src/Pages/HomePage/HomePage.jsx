import React, { useEffect, useState } from 'react'
import HeroComponent from '../../Components/HeroComponent'
import AboutUsComponent from '../../Components/AboutUsComponent'
import CategoryComponent from '../../Components/CategoryComponent'
import TopBookingServicesComponent from '../../Components/TopBookingServicesComponent'
import Testimonial from '../../Components/Testimonial'
import ContactUsComponent from '../../Components/ContactUsComponent'

import { getUser } from '../../Store/userSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const dataUser = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {

    const role = getUser()?.role;
    if (role === 'Provider') {
      navigate('/provider')
    }
  }, [dataUser]);

  return (
    <>
      <HeroComponent />
      <AboutUsComponent />
      <CategoryComponent />
      <TopBookingServicesComponent />
      <Testimonial />
      <ContactUsComponent />
    </>

  )
}

export default HomePage