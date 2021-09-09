import { useState } from 'react';

export const useForm = <T extends Object>( initialState: T ) => {
  const [ formValues, setFormValues ] = useState( initialState );

  const reset = ( newFormState = initialState ) => {
    setFormValues( newFormState );
  };

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setFormValues({
      ...formValues,
      [ e.target.name ]: e.target.value,
    });
  };

  return {
    ...formValues,
    handleInputChange,
    reset
  }
};