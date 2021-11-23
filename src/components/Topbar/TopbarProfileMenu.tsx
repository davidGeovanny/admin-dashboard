import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useTopbarMenuItem } from '../../hooks/useTopbarMenuItem';
import { AuthContext } from '../../context/AuthContext';
import { ConfirmationContext } from '../../context/ConfirmationContext';
import { randomColor } from '../../helpers/color';

export const TopbarProfileMenu = () => {
  const { logOut, user } = useContext( AuthContext );
  const { openModal, changeCallback } = useContext( ConfirmationContext );
  const history = useHistory();

  const { isMenuVisible, handleClick, handleBlur, handleMouseEvent } = useTopbarMenuItem([]);

  const redirect = ( url: string ) => {
    history.push( url );
  }

  const handleLogout = () => {
    changeCallback( logOut );
    openModal();
  }

  return (
    <li
      className={`nav-item dropdown no-arrow ${isMenuVisible ? 'show' : ''}`}
      onClick={() => handleClick()}
      onBlur={() => handleBlur()}
    >
      <Link className='nav-link dropdown-toggle' to='#'>
        <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
          { user?.username }
        </span>

        <div 
          style={{
            backgroundColor: randomColor( 1 ),
            borderRadius: '100%',
            width: 25,
            height: 25,
            textAlign: 'center'
          }}
          
        > { user?.username.slice(0, 1) } </div>

        {/* <img
          className='img-profile rounded-circle'
          src='https://logos-marcas.com/wp-content/uploads/2020/11/Razer-Logo.png'
          alt='Profile'
        /> */}
      </Link>

      <div 
        className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${ isMenuVisible ? 'show' : '' }`}
        onMouseEnter={ () => handleMouseEvent( true ) }
        onMouseLeave={ () => handleMouseEvent( false ) }
      >
        {/* <span className='dropdown-item' onClick={ () => redirect('/profile') }>
          <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
          Profile
        </span> */}

        <div className='dropdown-divider'></div>

        <span className='dropdown-item' onClick={ handleLogout }>
          <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
          Cerrar sesión
        </span>
      </div>
    </li>
  );
}
