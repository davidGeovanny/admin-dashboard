import React from 'react';
import { SidebarMenu } from '../interfaces/SidebarInterface';
import { useSidebarMenuItem } from '../hooks/useSidebarMenuItem';
import { NavLink, Link } from 'react-router-dom';

interface Props {
  menuItem: SidebarMenu;
}

export const SidebarMenuItem = ({ menuItem }: Props) => {

  const { 
    customStyle, 
    menuItemStatus, 
    submenuIsCollapsing, 
    handleClickMenu, 
    handleClickSubmenu, 
  } = useSidebarMenuItem( menuItem );

  return (
    <>
      {/* Nav Item - Pages Collapse Menu */}
      <li className={`nav-item ${ menuItem.item.active ? 'active' : '' }`}>
        <span
          className={`nav-link ${ menuItemStatus === 'hide' ? 'collapsed' : '' }`}
          data-toggle={ menuItem.subitem ? 'collapse' : '' }
          onClick={ () => handleClickMenu( menuItem.item.id, menuItem.item.redirection ) }
        >
          <i className={`fas fa-fw ${ menuItem.icon }`}></i>
          <span> { menuItem.item.name } </span>
        </span>

        {
          ( menuItem.subitem ) && (
            <div 
              className={`${ 
                submenuIsCollapsing 
                  ? 'collapsing' 
                  : menuItemStatus === 'show'
                    ? 'collapse show'
                    : 'collapse'
              }`}
              style={ customStyle }
            >
              <div className='bg-white py-2 collapse-inner rounded'>
                { menuItem.subitem.header && 
                  ( <h6 className='collapse-header'>{ menuItem.subitem.header }</h6> ) 
                }

                {
                  menuItem.subitem.items.map( ( item, index ) => (
                    <NavLink
                      className={`collapse-item ${ item.active ? 'active' : '' }`} 
                      onClick={ () => handleClickSubmenu( menuItem.item.id, item.redirection ) }
                      key={ index }
                      to={ item.redirection }
                      activeClassName="active"
                    >
                      { item.name }
                    </NavLink>
                  ))
                }
              </div>
            </div>
          )
        }
      </li>
    </>
  );
}