import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTopbarMenuItem } from '../hooks/useTopbarMenuItem';

export const TopbarProfileMenu = () => {
  const history = useHistory();

  const { isMenuVisible, handleClick, handleBlur, handleMouseEvent } = useTopbarMenuItem([]);

  const redirect = ( url: string ) => {
    history.push( url );
  }

  return (
    <li
      className={`nav-item dropdown no-arrow ${isMenuVisible ? 'show' : ''}`}
      onClick={() => handleClick()}
      onBlur={() => handleBlur()}
    >
      <a className="nav-link dropdown-toggle" href="#">
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          Ingeniero Geovanny
        </span>

        <img
          className="img-profile rounded-circle"
          src="https://logos-marcas.com/wp-content/uploads/2020/11/Razer-Logo.png"
          alt='Profile'
        />
      </a>

      <div 
        className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${ isMenuVisible ? 'show' : '' }`}
        onMouseEnter={ () => handleMouseEvent( true ) }
        onMouseLeave={ () => handleMouseEvent( false ) }
      >
        <span className="dropdown-item" onClick={ () => redirect('/profile') }>
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Profile
        </span>

        <div className="dropdown-divider"></div>

        <span className="dropdown-item" onClick={ () => redirect('/login') }>
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </span>
      </div>
    </li>
  );
}
