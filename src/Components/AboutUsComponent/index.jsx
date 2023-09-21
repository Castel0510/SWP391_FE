import React from 'react'
import gridImage from '../../Assets/Images/background_signin_signup.png'
import './style.scss'

const AboutUsComponent = () => {
    return (
        <div className="about-us section">
            <div className="section-container">
                <div className="title">
                    <small>about us</small>
                    <h2>Welcome to our advantages</h2>
                    <p>Find help with booking and see what to expect along the services</p>
                </div>

                <div className="info grid">
                    <div className="text grid">
                        <div className="singleInfo">
                            <div className="number colorOne">01</div>
                            <h4>Diverse Types Of Services</h4>
                            <p>
                                We provide the most essential services to serve your bird.
                            </p>
                        </div>

                        <div className="singleInfo">
                            <div className="number colorTwo">02</div>
                            <h4>The Procedure Is Simple</h4>
                            <p>
                                As long as you confirm the correct address, quantity, and information, you can easily hire the service
                            </p>
                        </div>

                        <div className="singleInfo">
                            <div className="number colorThree">03</div>
                            <h4>Secure Payment</h4>
                            <p>
                                Diverse payment methods: ATM, E-wallet
                            </p>
                        </div>
                    </div>

                    <div className="img-container">
                        <img src={gridImage} alt="About us" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsComponent