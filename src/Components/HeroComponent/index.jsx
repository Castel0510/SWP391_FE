import React from 'react'
import './style.scss'
import bird_hero from '../../Assets/Images/bird_hero.png'
import { motion } from 'framer-motion'

const HeroComponent = () => {
    return (
        <section className="hero-wrapper">
            <div className='hero-container'>
                <motion.div
                    initial={{ y: "2rem", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "string" }}
                    className="hero-left"
                >
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