import React from 'react';

const InputField = (props) => {

    const {
        icon: Icon,
        type,
        value,
        onChange,
        label,
        error,
    } = props

    return (
        <>
            <div className={`input-box ${error ? 'error-input' : ''}`}>
                {Icon && <Icon />}
                <input
                    type={type}
                    className='input'
                    placeholder=" "
                    value={value}
                    onChange={onChange}
                />
                <label htmlFor="">{label}</label>
            </div>

            {error && <span className="text-red-600">{error}</span>}
        </>
    );
};

export default InputField;
