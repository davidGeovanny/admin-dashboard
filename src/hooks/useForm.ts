import React, { useState } from "react";

const useForm = <T>( initialState: T ) => {
  const [ formValues, setFormValues ] = useState<T>( initialState );

  const reset = () => {
    setFormValues( initialState );
  };

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setFormValues({
      ...formValues,
      [ e.target.name ]: e.target.value
    });
  }

  return { ...formValues, handleInputChange, reset };
}
 
export default useForm;