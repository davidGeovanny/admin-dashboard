import React from 'react';
import { SidebarMenu } from '../interfaces/SidebarInterface';
import { useSidebarMenuItem } from '../hooks/useSidebarMenuItem';

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
          onClick={ () => handleClickMenu( menuItem.item.id ) }
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
                    <span
                      className={`collapse-item ${ item.active ? 'active' : '' }`} 
                      onClick={ () => handleClickSubmenu( menuItem.item.id, item.id ) }
                      key={ index }
                    >
                      { item.name }
                    </span>
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