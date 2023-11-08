import React, { useEffect, useState } from 'react';
import { renderRatingStars } from '../../../Utils';
import './style.scss';
import avatar_tmp from '../../../Assets/Images/bird_hero.png';
import { useSelector } from 'react-redux';
import { locationOptions } from '../../../models/bird';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import { Link, useNavigate } from 'react-router-dom';
function getUser() {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
    } else {
        user = null;
    }
    return user;
}

const ServiceCardItem = ({ item }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dataUser = useSelector((state) => state.user);

    useEffect(() => {
        setUser(getUser());
    }, [dataUser]);

    return (
        <div
            onClick={() => {
                navigate(`/detail/${item.id}`);
            }}
            key={item.id}
            className={` mx-2 max-w-sm bg-white border border-gray-200 rounded-lg single-card`}
        >
            <div className="img-div">
                <img className="rounded-t-lg" src={item.imageURL} alt="services image" />
            </div>
            <div className="px-5 py-5">
                <div>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1">
                        {item.birdServiceName}
                    </h5>
                </div>

                <p className="text-sm text-gray-500">{locationOptions.find((x) => x.value === item.location)?.label}</p>

                <p className="text-sm text-black-500 line-clamp-2">{item.description}</p>

                {/* rating */}
                <div className="flex items-center mt-2.5 mb-5">
                    <Rating className="w-32 h-8" value={item.avgRating} onChange={() => {}} readOnly />
                </div>
            </div>
        </div>
    );
};

export default ServiceCardItem;
