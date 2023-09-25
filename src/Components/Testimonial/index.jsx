import React, { useEffect } from "react";
import './style.scss';
import ava from "../../Assets/Images/bird_hero.png";
import Aos from 'aos'
import 'aos/dist/aos.css'

const Testimonial = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const testimonialList = [
        {
            effect: 'fade-up-right',
            duration: '3500',
            avatar: ava,
            name: 'User 1',
            role: 'Customer',
            description: ' Good usable service'
        },
        {
            effect: 'fade-up-right',
            duration: '3500',
            avatar: ava,
            name: 'Miss A',
            role: 'Customer',
            description: 'Thank you this service met my expectations! '
        },
        {
            effect: 'fade-up-left',
            duration: '3500',
            avatar: ava,
            name: 'Anna',
            role: 'Customer',
            description: 'I will always support and continue to use this service in the future. '
        },
        {
            effect: 'fade-up-left',
            duration: '3500',
            avatar: ava,
            name: 'An',
            role: 'Customer',
            description: 'This service is truly worth every penny you spend. '
        },
    ]

    return (
        <div className="testimonial">
            <div data-aos='zoom-in' data-aos-duration='1000' className="title">
                <small>testimonial</small>
                <h2>What did customers say about us?</h2>
            </div>

            <div className="comment-container flex">
                {
                    testimonialList.map((item, key) => (
                        <figure data-aos={item.effect} data-aos-duration={item.duration} className="snip1390" key={key}>
                            <img src={item.avatar} alt={item.name} className="profile" />
                            <figcaption>
                                <h2>{item.name}</h2>
                                <h4>{item.role}</h4>
                                <blockquote>{item.description}</blockquote>
                            </figcaption>
                        </figure>
                    ))
                }
            </div>
        </div>
    );
};

export default Testimonial;
