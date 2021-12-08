import React, { useEffect, useRef, useState } from 'react';
import './dropdown.css';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
  data:           string[];
  onChange:       ( option: string ) => any;
  defaultOption?: string;
  position?:      'up' | 'down' | 'right' | 'left';
  variant?:       'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'dark';
}

export const Dropdown = ( { 
  data: initData,
  onChange,
  position = 'down',
  variant  = 'primary',
  defaultOption,
}: Props ) => {
  const dropdownDiv       = useRef<HTMLDivElement>( null );
  const [ data, setData ] = useState<string[]>( initData );
  const [ show, setShow ] = useState<boolean>( false );
  const [ labelText, setLabelText ] = useState<string>('Seleccionar');

  useClickOutside(dropdownDiv, () => { setShow( false ) })

  const handleShowDropdown = () => {
    setShow( !show ); 
  }

  const onClickItem = ( dropItem: string ) => {
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

  const arrow = <i className={`fas fa-angle-${ position }`}></i>;

  return (
    <div 
      className={`drop${ position }`}
      ref={ dropdownDiv }
    >
      <button
        type='button'
        className={`btn btn-square btn-${ variant }`}
        onClick={ handleShowDropdown }
      >
        { position === 'left' && arrow }
        {' '}{ labelText }{' '}
        { position !== 'left' && arrow }
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