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
            duration: '2500',
            avatar: ava,
            name: 'Brother A',
            role: 'Customer',
            description: 'ok ok ok ok ok '
        },
        {
            effect: 'fade-up-right',
            duration: '3500',
            avatar: ava,
            name: 'Brother A',
            role: 'Customer',
            description: 'ok ok ok ok ok '
        },
        {
            effect: 'fade-up-left',
            duration: '4500',
            avatar: ava,
            name: 'Brother A',
            role: 'Customer',
            description: 'ok ok ok ok ok '
        },
        {
            effect: 'fade-up-left',
            duration: '5500',
            avatar: ava,
            name: 'Brother A',
            role: 'Customer',
            description: 'ok ok ok ok ok '
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
