import React from 'react';
import { InputAttr } from '../interfaces/InputInterface';

interface Props {
  state        : InputAttr;
  setState     : React.Dispatch<React.SetStateAction<InputAttr[]>>
  placeholder  : string;
  errorMessage?: string;
  type        ?: string;
  validation  ?: 'user' | 'name'| 'password' | 'email' | 'phone';
  callback    ?: () => void;
};

const regularExpressions = {
  user    : /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  name    : /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  email   : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone   : /^\d{7,14}$/ // 7 a 14 numeros.
};

export const InputForm = ({ state, setState, placeholder, errorMessage, validation, type = 'text', callback }: Props) => {

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setState(( form => {
      return form.map( input => {
        if( input.name === e.target.name ) {
          input.value = e.target.value;
          if( !validation ) {
            input.isValid = e.target.value.trim().length > 0 ? true : false;
          }
        }

        return input;
      })
    }));
  };

  const handleInputValidate = () => {
    if( validation ) {
      const fieldIsValid: boolean | null = state.value.trim().length > 0 ? regularExpressions[ validation ].test( state.value ) : null;

      setState(( form => {
        return form.map( input => {
          if( input.name === state.name ) {
            input.isValid = fieldIsValid;
          }
  
          return input;
        })
      }));
    }

    if( callback ) callback();
  }

  return (
    <div className='form-group'>
      <input
        autoComplete='off'
        className={`form-control form-control-user ${ state.isValid === null || !validation ? '' : state.isValid ? 'is-valid' : 'is-invalid' }`}
        placeholder={ placeholder }
        type={ type }
        name={ state.name }
        value={ state.value }
        onChange={ handleInputChange }
        onKeyUp={ handleInputValidate }
        onBlur={ handleInputValidate }
      />
      { errorMessage && <div className='invalid-feedback'>{ errorMessage }</div> }
    </div>
  );
}
