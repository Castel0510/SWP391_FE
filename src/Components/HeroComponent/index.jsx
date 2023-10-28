import React, { useEffect, useState } from 'react'
import './style.scss'
import bird_hero from '../../Assets/Images/bird_hero.png'
import { motion } from 'framer-motion'
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

const HeroComponent = () => {
    const [user, setUser] = useState(null);
    const dataUser = useSelector((state) => state.user);

    useEffect(() => {
        setUser(getUser());
    }, [dataUser]);

    return (
        <section className="hero-wrapper">
            <div className='hero-container'>
                <motion.div
                    initial={{ y: "2rem", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "string" }}
                    className="hero-left"
                >
                    {user?.role !== 'Provider'
                        ?
                        <>
                            <div className="hero-title">
                                <p>
                                    let's
                                    <br />
                                    fun
                                    <br />
                                    with bird
                                </p>
                            </div>

                            <div className="hero-button">
                                Booking
                            </div>
                        </>
                        :
                        <div className="hero-title-provider">
                            <p>
                                Hello Provider
                                <br />
                                {user?.fullName}
                                <br />
                                Come back!
                            </p>
                        </div>
                    }

                </motion.div>

                <div className="hero-right">
                    <motion.div
                        initial={{ x: "7rem", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 2, type: "spring" }}
                        className="image-container"
                    >
                        <img src={bird_hero} />
                    </motion.div>
                </div>
            </div>
        </section >
    )
}

export default HeroComponent