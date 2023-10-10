import React from 'react';
import './style.scss';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BsTelephone } from 'react-icons/bs'
import { Link } from 'react-router-dom';

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>About Us</h4>
            <p>We create connections for bird owners in need of bird feeding services and service providers. Come to us when you have difficulties</p>
          </div>
          <div className="footer-col">
            <h4>Information</h4>
            <ul>
              <li><Link href="#">About us</Link></li>
              <li><Link href="#">Delivery information</Link></li>
              <li><Link href="#">Our Services</Link></li>
              <li><Link href="#">Contact us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li><Link href="#">Boarding</Link></li>
              <li><Link href="#">Grooming</Link></li>
              <li><Link href="#">Medical</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <p>If you have any question please contact us at demo@example.com</p>
            <ul className='mt-4'>
              <li className='flex justify-items-center text-black'><HiOutlineLocationMarker /><Link href="#" className='pl-2'>123 Address</Link></li>
              <li className='flex justify-items-center text-black'><BsTelephone /><Link href="#" className='pl-2'> 0923456789</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
