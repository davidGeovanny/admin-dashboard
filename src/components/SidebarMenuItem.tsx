import React, { useEffect, useState } from 'react';
import { SidebarMenu } from '../interfaces/SidebarInterface';

interface Props {
  menuItem:    SidebarMenu;
  isCollapsed: boolean;
}

type MenuItemAction = 'show' | 'hide';

export const SidebarMenuItem = ({ menuItem, isCollapsed }: Props) => {

  const [ menuItemState, setMenuItemState ] = useState<MenuItemAction>('hide');
  const [ isCollapsing, setIsCollapsing ] = useState<boolean>( false );
  const [ customStyle, setCustomStyle ] = useState<React.CSSProperties>();

  const handleMenuAction = () => {
    setIsCollapsing( true );

    setTimeout(() => {
      setMenuItemState( menuItemState === 'show' ? 'hide' : 'show' );
      setIsCollapsing( false );
    }, 150);
  }

  useEffect(() => {
    if( isCollapsing ) {
      if( menuItemState === 'hide'  ) {
        setCustomStyle({
          height: ( menuItem.subitem?.header ? 60 : 0 ) + ( menuItem.subitem ? menuItem.subitem.items.length * 36 : 0 )
        });
      } else {
        setCustomStyle({});
      }
    } else {
      if( menuItemState === 'show'  ) {
        setCustomStyle({
          height: ( menuItem.subitem?.header ? 60 : 0 ) + ( menuItem.subitem ? menuItem.subitem.items.length * 36 : 0 )
        });
      } else {
        setCustomStyle({});
      }
    }
  }, [ isCollapsing ]);

  useEffect(() => {
    if( isCollapsed ) {
      if( menuItemState === 'show' ) {
        handleMenuAction();
      }
    }
  }, [ isCollapsed, handleMenuAction ]);
  
  useEffect(() => {
    if( menuItem.active && menuItem.subitem ) {
      setMenuItemState('show');
    } else {
      setMenuItemState('hide');
    }
  }, []);
  
  return (
    <>
      {/* Nav Item - Pages Collapse Menu */}
      <li className={`nav-item ${ menuItem.active ? 'active' : '' }`} onBlur={ isCollapsed ? handleMenuAction : () => {} }>
        <a 
          className={`nav-link ${ menuItemState === 'hide' ? 'collapsed' : '' }`} 
          href='#' 
          data-toggle={ menuItem.subitem ? 'collapse' : '' }
          onClick={ menuItem.subitem ? handleMenuAction : () => { /** Redirection */ } }
        >
          <i className={`fas fa-fw ${ menuItem.icon }`}></i>
          <span> { menuItem.item.name } </span>
        </a>
        
        {
          ( menuItem.subitem ) && (
            <div 
              id='collapseTwo' 
              className={`${ isCollapsing ? 'collapsing' : menuItemState === 'show' ? 'collapse show' : 'collapse' }`}
              style={ customStyle }
            >
              <div className='bg-white py-2 collapse-inner rounded'>
                { menuItem.subitem.header && 
                  ( <h6 className='collapse-header'>{ menuItem.subitem.header }</h6> ) 
                }

                {
                  menuItem.subitem.items.map( ( item, index ) => (
                    <a 
                      className='collapse-item' 
                      href={ item.redirection }
                      key={ index }
                    >
                      { item.name }
                    </a>
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