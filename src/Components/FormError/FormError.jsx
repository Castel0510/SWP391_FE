import { useFormContext } from 'react-hook-form';
import _get from 'lodash/get';

const FormError = ({ name }) => {
    const formMethods = useFormContext();

    return (
        <>
            {Boolean(_get(formMethods.formState.errors, `${name}.message`, '')) && (
                <div className="text-sm text-red-500">{_get(formMethods.formState.errors, `${name}.message`, '')}</div>
            )}
        </>
    );
};

export default FormError;
