import React, { useRef, useState } from 'react';
import { useField, useFormikContext } from 'formik';

import { useClickOutside } from '../../../hooks/useClickOutside';

import './dropdown.css';

interface Props<T> {
  [ x: string ]: any; 
  data: T[];
  name: string,
  loading?:  boolean;
  variant?:  'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'dark';
  position?: 'up' | 'down' | 'right' | 'left';
  onSelectedItem?: ( item: T ) => void;
}

export const Dropdown = <T,>({
  data,
  name,
  loading  = false,
  position = 'down',
  variant  = 'primary',
  onSelectedItem = (item: T) => {},
  ...props
}: Props<T>) => {
  const { setFieldValue } = useFormikContext();
  const [ field ] = useField({ ...props, name });

  const [ show, setShow ] = useState<boolean>( false );

  const dropdownDiv = useRef<HTMLDivElement>( null );

  useClickOutside( dropdownDiv, () => { setShow( false ) } );

  const handleShowDropdown = () => {
    setShow( !show );
  }

  const handleClickItem = ( dropItem: T ) => {
    if( loading ) return;
    if( dropItem !== field.value ) {
      setFieldValue( field.name, dropItem );
    }

    onSelectedItem( dropItem );
    setShow( false );
  }

  const renderIcon = (): JSX.Element => {
    return ( loading ) 
      ? <i className="fas fa-spinner fa-pulse"></i>
      : <i className={`fas fa-angle-${ position }`}></i>;
  }

  return (
    <div 
      className={`drop${ position } select-drop${ position } w-100`}
      ref={ dropdownDiv }
    >
      <button
        { ...props }
        type="button"
        className={`btn btn-${ variant } w-100 ${ props.className ? props.className : '' }`}
        onClick={ handleShowDropdown }
        disabled={ loading }
      >
        { position === 'left' && renderIcon() }
        <span className='d-none d-sm-inline'>
          {' '}{ ( field.value ) ? field.value : 'Seleccionar' }{' '}
        </span>
        <span className=' d-sm-none'>
          {' '}{ ( field.value ) ? ( typeof field.value === 'string' ? field.value.charAt(0) : field.value ) : 'Seleccionar' }{' '}
        </span>
        { position !== 'left' && renderIcon() }
      </button>
      
      <ul className={`dropdown-menu dropdown-${ variant } ${ show && 'show' } ${ position === 'down' || position === 'up' ? 'w-100' : '' }`}>
        {
          data.map( ( item, index ) => (
            <li
              key={ index }
              className={`dropdown-item pointer ${ field.value === item && 'active' }`}
              onClick={ () => handleClickItem( item ) }
            >
              { item }
            </li>
          ))
        }
      </ul>
    </div>
  );
}