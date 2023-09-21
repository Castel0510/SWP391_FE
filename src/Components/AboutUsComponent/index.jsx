import React, { useEffect } from 'react'
import gridImage from '../../Assets/Images/background_signin_signup.png'
import './style.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'

const AboutUsComponent = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className="about-us section">
            <div className="section-container">
                <div data-aos='flip-up' data-aos-duration='1000' className="title">
                    <small>about us</small>
                    <h2>Welcome to our advantages</h2>
                    <p>Find help with booking and see what to expect along the services</p>
                </div>

                <div className="info grid">
                    <div className="text grid">
                        <div data-aos='fade-up' data-aos-duration='2500' className="singleInfo">
                            <div className="number colorOne">01</div>
                            <h4>Diverse Types Of Services</h4>
                            <p>
                                We provide the most essential services to serve your bird.
                            </p>
                        </div>

                        <div data-aos='fade-up' data-aos-duration='3500' className="singleInfo">
                            <div className="number colorTwo">02</div>
                            <h4>The Procedure Is Simple</h4>
                            <p>
                                As long as you confirm the correct address, quantity, and information, you can easily hire the service
                            </p>
                        </div>

                        <div data-aos='fade-up' data-aos-duration='4500' className="singleInfo">
                            <div className="number colorThree">03</div>
                            <h4>Secure Payment</h4>
                            <p>
                                Diverse payment methods: ATM, E-wallet
                            </p>
                        </div>
                    </div>

                    <div data-aos='fade-left' data-aos-duration='3500' className="img-container">
                        <img src={gridImage} alt="About us" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsComponent