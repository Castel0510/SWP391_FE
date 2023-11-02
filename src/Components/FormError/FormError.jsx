import { useFormContext } from 'react-hook-form';

const FormError = ({ name }) => {
    const formMethods = useFormContext();

    return (
        <>
            {formMethods.formState.errors[name] && (
                <div className="text-sm text-red-500">{formMethods.formState.errors[name].message}</div>
            )}
        </>
    );
};

export default FormError;
