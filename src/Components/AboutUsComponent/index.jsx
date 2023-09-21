import React, { useEffect } from 'react'
import gridImage from '../../Assets/Images/background_signin_signup.png'
import './style.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'

const AboutUsComponent = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const advantagesList = [
        {
            duration: '2500',
            id: '01',
            title: 'Diverse Types Of Services',
            description: 'We provide the most essential services to serve your bird.',
            className: 'colorOne'
        },
        {
            duration: '3500',
            id: '02',
            title: 'The Procedure Is Simple',
            description: 'As long as you confirm the correct address, quantity, and information, you can easily hire the service',
            className: 'colorTwo'
        },
        {
            duration: '4500',
            id: '03',
            title: 'Secure Payment',
            description: ' Diverse payment methods: ATM, E-wallet',
            className: 'colorThree'
        },
    ]

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
                        {advantagesList.map((item, key) => (
                            <div data-aos='fade-up' data-aos-duration={item.duration} className="singleInfo" key={key}>
                                <div className={`number ${item.className}`}>{item.id}</div>
                                <h4>{item.title}</h4>
                                <p>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div data-aos='fade-left' data-aos-duration='2500' className="img-container">
                        <img src={gridImage} alt="About us" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsComponent