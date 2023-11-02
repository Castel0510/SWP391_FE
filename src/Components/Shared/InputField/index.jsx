import PropTypes from 'prop-types';

const InputField = (props) => {
    const { icon: Icon, type, value, onChange, label, error } = props;

    return (
        <>
            <div className={`input-box ${error ? 'error-input' : ''}`}>
                {Icon && <Icon />}
                <input type={type} className="input" placeholder=" " value={value} onChange={onChange} />
                <label htmlFor="">{label}</label>
            </div>

            {error && <span className="text-red-600">{error}</span>}
        </>
    );
};

InputField.propTypes = {
    icon: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.string,
};

export default InputField;
