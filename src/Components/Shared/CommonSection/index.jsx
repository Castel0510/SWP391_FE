import React, { useEffect, useState } from "react";
import './style.scss'
import { capitalizeFirstLetter } from "../../../Utils"

const CommonSection = (props) => {

    const { title, listItems, activeItem, updateFilteredItems } = props

    const [activeItemInSite, setActiveItemInSite] = useState(activeItem)

    useEffect(() => {
        setActiveItemInSite(activeItem);
        updateFilteredItems(activeItem); 
    }, [activeItem]);

    const changeActiveItem = (name) => {
        const url = new URL(window.location.href);
        url.searchParams.set('activeItem', name);
        window.history.pushState({}, '', url);
        setActiveItemInSite(name);
        updateFilteredItems(name);
    }

    return (
        <section className="common__section">
            <div className="text-title">
                <p>{title}</p>
            </div>

            <div className="list-option">
                {listItems.map((item, key) => (
                    <button
                        key={key}
                        className={`btn-item ${item.name === activeItemInSite ? 'active' : ''}`}
                        onClick={() => changeActiveItem(item.name)}
                    >
                        {capitalizeFirstLetter(item.name)}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CommonSection;
