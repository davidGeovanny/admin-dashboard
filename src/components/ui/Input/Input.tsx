import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';

import './input.css';

interface Props { 
  [ x: string ]: any; 
  name:  string;
  label: string;
}

export const Input = ({ name, label, ...props }: Props) => {
  const { setFieldValue } = useFormikContext();
  const [ field ] = useField({ ...props, name });
  
  const [ isActive, setIsActive ] = useState<boolean>( false );

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setFieldValue( field.name, e.target.value );
  }

  const handleFocus = () => {
    setIsActive( true );
  }

  const handleBlur = () => {
    setIsActive( false );
  }

  return (
    <div className={`field ${ ( isActive || field.value ) ? 'active' : '' }`}>
      <input
        { ...field }
        { ...props }
        type={ ( props.type ) ? props.type : 'text' }
        placeholder={ ( props.placeholder ) ? props.placeholder : label }
        value={ ( field.value ) ? field.value : '' }
        onChange={ handleChange }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
      />
      <label htmlFor={ name }> { label } </label>
    </div>
  );
}