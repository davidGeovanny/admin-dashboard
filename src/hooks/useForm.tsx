import { useCallback, useEffect, useState } from 'react';
import { InputAttr } from '../interfaces/InputInterface';

export const useForm = ( initState: InputAttr[] ) => {
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const [ formIsValid, setFormIsValid ] = useState<boolean | null>( null );
  const [ form, setForm ] = useState<InputAttr[]>( initState );

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const isValid: boolean = form.filter( input => !input.isValid ).length > 0 ? false : true;

    setFormIsValid( isValid );
    setErrorMessage( !isValid ? 'Please fill all required fields' : '' );
  }

  const reset = useCallback(() => {
    setForm( initState );
  }, [ initState ]);
  
  useEffect(() => {
    setFormIsValid( null );
    setErrorMessage('');
  }, [ form ]);

  return {
    form,
    setForm,
    formIsValid,
    errorMessage,
    handleSubmit,
    reset,
  };
}








// import { useState } from 'react';

// export const useForm = <T extends Object>( initialState: T ) => {
//   const [ formValues, setFormValues ] = useState( initialState );

//   const reset = ( newFormState = initialState ) => {
//     setFormValues( newFormState );
//   };

//   const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
//     setFormValues({
//       ...formValues,
//       [ e.target.name ]: e.target.value,
//     });
//   };

//   return {
//     ...formValues,
//     handleInputChange,
//     reset
//   }
// };