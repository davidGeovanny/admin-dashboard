import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import './dropdown.css';

interface Props<T> {
  data:           T[];
  loading:        boolean;
  defaultOption?: T;
  position?:      'up' | 'down' | 'right' | 'left';
  variant?:       'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'dark';
  onChange:       ( option: T ) => any;
}

export const Dropdown = <T,>( { 
  data: initData,
  defaultOption,
  loading,
  position = 'down',
  variant  = 'primary',
  onChange,
}: Props<T> ) => {
  const dropdownDiv       = useRef<HTMLDivElement>( null );
  const [ data, setData ] = useState<T[]>( initData );
  const [ show, setShow ] = useState<boolean>( false );
  const [ labelText, setLabelText ] = useState<T | string>('Seleccionar');

  useClickOutside( dropdownDiv, () => { setShow( false ) } );

  const handleShowDropdown = () => {
    setShow( !show ); 
  }

  const onClickItem = ( dropItem: T ) => {
    if( loading ) return;
    if( dropItem !== labelText ) {
      setLabelText( dropItem );
      onChange( dropItem );
    }

    setShow( false );
  }

  useEffect(() => {
    setData( Array.from( new Set( initData ) ) );
  }, []);

  useEffect(() => {
    if( !defaultOption || !data.includes( defaultOption ) ) return;
    
    setLabelText( defaultOption );
  }, [ data ]);
  
  const renderIcon = (): JSX.Element => {
    return loading 
      ? <i className='fas fa-spinner fa-pulse'></i>
      : <i className={`fas fa-angle-${ position }`}></i>;
  }

  return (
    <div 
      className={`drop${ position }`}
      ref={ dropdownDiv }
    >
      <button
        type='button'
        className={`btn btn-square btn-${ variant }`}
        onClick={ handleShowDropdown }
        disabled={ loading }
      >
        { position === 'left' && renderIcon() }
        {' '}{ labelText }{' '}
        { position !== 'left' && renderIcon() }
      </button>

      <div className={`dropdown-menu dropdown-${ variant } ${ show && 'show' }`}>
        {
          data.map( ( item, index )  => (
            <li
              key={ index }
              className={`dropdown-item pointer ${ labelText === item && 'active' }`}
              onClick={ () => onClickItem( item ) }
            >
              { item }
            </li>
          ))
        }
      </div>
    </div>
  );
}