import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TopbarMenuItem } from './TopbarMenuItem';
import { useTopbarMenuItem } from '../hooks/useTopbarMenuItem';
import { Picture, TopbarItem } from '../interfaces/TopbarInterface';
import { SidebarContext } from '../context/SidebarContext';

interface Props {
  picture : Picture;
  items   : TopbarItem[];
  title  ?: string;
  url     : string;
}

export const TopbarMenu = ({ picture, title, items, url }: Props) => {
  const { redirectTo } = useContext( SidebarContext );

  const { type } = picture;

  const { divRef, isMenuVisible, getCountReadItems, handleClick, handleBlur, handleMouseEvent } = useTopbarMenuItem( items );

  const renderPicture = () => {
    const elementsRead: number = getCountReadItems();
    const badgeCounter: string = ( elementsRead ) === 0
                                  ? ''
                                  : ( elementsRead ) > 9
                                    ? '9+'
                                    : `${ elementsRead }`;

    if( type === 'icon' ) {
      return (
        <>
          <i className={`fas fa-fw ${ picture.icon }`}></i>
          <span className="badge badge-danger badge-counter">{ badgeCounter }</span>
        </>
      );
    } else {
      return (
        <>
          <img
            className="img-profile rounded-circle"
            src={ picture.src }
            alt='Profile'
          />
          <span className="badge badge-danger badge-counter">{ badgeCounter }</span>
        </>
      );
    }
  }

  return (
    <li 
      className={`nav-item dropdown no-arrow mx-1 ${ isMenuVisible ? 'show' : '' }`}
      onClick={ () => handleClick() }
      onBlur={ () => handleBlur() }
    >
      <Link className="nav-link dropdown-toggle" to='#'>
        { renderPicture() }
      </Link>

      <div 
        className={`dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in ${ isMenuVisible ? 'show' : '' }`}
        ref={ divRef }
        onMouseEnter={ () => handleMouseEvent( true ) }
        onMouseLeave={ () => handleMouseEvent( false ) }
      >
        { title && ( <h6 className="dropdown-header">{ title }</h6> ) }

        {
          items.map( item => (
            <span 
              key={ item.id } 
              className="dropdown-item d-flex align-items-center"
              onClick={ () => redirectTo( url ) }
            >
              <TopbarMenuItem item={ item } />
            </span>
          ))
        }

        <span 
          className="dropdown-item text-center small text-gray-500"
          onClick={ () => redirectTo( url ) }
        >
          Show All
        </span>
      </div>
    </li>
  );
}