import React, { useState } from 'react';
import './input.css';

interface Props { 
  [ x: string ]: any; 
  name: string;

  id:        string;
  locked?:   boolean;
  focussed?: boolean;
  value?:    string;
  error?:    string;
  label?:    string;
  onChange?: Function;
}

export const Input = ({
  id,
  locked = false,
  focussed = false,
  value = '',
  error = '',
  label = 'Label',
  onChange = () => '',
  ...props 
}: Props) => {
  const [state, setState] = useState({
    active: ( locked && focussed ) || false,
    value,
    error,
    label
  });

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    console.log( {event} );
    const value = event.target.value;
    setState({ ...state, value, error: "" });
  }

  const fieldClassName = `field ${(locked ? state.active : state.active || value) && "active"} ${locked && !state.active && "locked"}`;
  return (
    <div className={fieldClassName}>
        <input
          id={id}
          type="text"
          value={state.value}
          placeholder={label}
          onChange={ handleChange }
          onFocus={() => !locked && setState({ ...state, active: true })}
          onBlur={() => !locked && setState({ ...state, active: false })}
        />
        <label htmlFor={id} className={error && "error"}>
          {error || label}
        </label>
      </div>
  );
}
