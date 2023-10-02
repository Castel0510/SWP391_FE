import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from "react-select/animated";
import './style.scss'

const MultipleSelect = (props) => {
    const { listMultiSelect } = props

    const options = listMultiSelect.map((item, index) => {
        return {
            value: item,
            label: item,
        };
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const animatedComponents = makeAnimated();


    const handleSelect = () => {
        console.log(selectedOptions);
    };

    return (
        <div className='multiple-select'>
            <Select
                components={animatedComponents}
                isMulti
                options={options}
                onChange={(item) => setSelectedOptions(item)}
                className="select"
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                closeMenuOnSelect={false}
            />
        </div>
    )
}

export default MultipleSelect