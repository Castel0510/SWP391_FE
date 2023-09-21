import React from 'react'
import gridImage from '../../Assets/Images/background_signin_signup.png'
import './style.scss'

const AboutUsComponent = () => {
    return (
        <div className="about-us section">
            <div className="section-container">
                <div className="title">
                    <small>about us</small>
                    <h2>Welcome to our services</h2>
                    <p>Find help with booking and see what to expect along the services</p>
                </div>

                <div className="info grid">
                    <div className="text grid">
                        <div className="singleInfo">
                            <div className="number colorOne">01</div>
                            <h4>Fast and convenient</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta minima iure, eligendi sint sequi aspernatur perferendis harum repudiandae ullam ea? Consequuntur id perspiciatis odio veritatis? Delectus cumque laudantium saepe fugiat.
                            </p>
                        </div>

                        <div className="singleInfo">
                            <div className="number colorTwo">02</div>
                            <h4>Reasonable affordable price</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta minima iure, eligendi sint sequi aspernatur perferendis harum repudiandae ullam ea? Consequuntur id perspiciatis odio veritatis? Delectus cumque laudantium saepe fugiat.
                            </p>
                        </div>

                        <div className="singleInfo">
                            <div className="number colorThree">03</div>
                            <h4>Hmmmmm</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta minima iure, eligendi sint sequi aspernatur perferendis harum repudiandae ullam ea? Consequuntur id perspiciatis odio veritatis? Delectus cumque laudantium saepe fugiat.
                            </p>
                        </div>
                    </div>

                    <div className="img-container">
                        <img src={gridImage} alt="About us"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsComponent