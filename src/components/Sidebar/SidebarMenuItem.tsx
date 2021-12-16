import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSidebarMenuItem } from '../../hooks/useSidebarMenuItem';
import { SidebarMenu } from '../../interfaces/SidebarInterface';

interface Props {
  menuItem: SidebarMenu;
}

export const SidebarMenuItem = ({ menuItem }: Props) => {

  const { 
    customStyle, 
    menuItemStatus, 
    submenuIsCollapsing, 
    isPathMatch,
    handleClickMenu, 
  } = useSidebarMenuItem( menuItem );
  
  return (
    <>
      {/* Nav Item - Pages Collapse Menu */}
      <li className={`nav-item`}>
        {
          menuItem.subitem
            ? (
              <span
                className={`nav-link ${ menuItemStatus === 'hide' ? 'collapsed' : '' } ${ isPathMatch ? 'active' : '' }`}
                data-toggle={ menuItem.subitem ? 'collapse' : '' }
                onClick={ () => handleClickMenu( menuItem.item.id ) }
              >
                <i className={`fas fa-fw ${ menuItem.icon }`}></i>
                <span> { menuItem.item.name } </span>
              </span>
            )
            : (
              <NavLink
                className='nav-link'
                data-toggle={ menuItem.subitem ? 'collapse' : '' }
                to={ menuItem.item.redirection }
                activeClassName='active'
              >
                <i className={`fas fa-fw ${ menuItem.icon }`}></i>
                <span> { menuItem.item.name } </span>
              </NavLink>
            )
        }

        { ( menuItem.subitem ) && (
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
                { menuItem.subitem.header && ( <h6 className='collapse-header'>{ menuItem.subitem.header }</h6> ) }
                
                {
                  menuItem.subitem.items.map( ( item, index ) => (
                    <NavLink
                      className='collapse-item' 
                      key={ index }
                      to={ item.redirection }
                      activeClassName='active'
                    >
                      { item.name }
                    </NavLink>
                  ))
                }
              </div>
            </div>
        ) }
      </li>
    </>
  );
}