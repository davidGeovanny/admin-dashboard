import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarContext } from '../context/SidebarContext';
import { SidebarMenu } from '../interfaces/SidebarInterface';

type MenuItemAction = 'show' | 'hide';

export const useSidebarMenuItem = ( menuItem: SidebarMenu ) => {
  const location = useLocation();

  const { onCollapseSubmenu, menuState } = useContext( SidebarContext );

  const [ submenuIsCollapsing, setSubmenuIsCollapsing ] = useState<boolean>( false );
  const [ menuItemStatus, setMenuItemStatus ] = useState<MenuItemAction>('hide');
  const [ customStyle, setCustomStyle ] = useState<React.CSSProperties>();
  const [ isPathMatch, setIsPathMatch ] = useState<boolean>( false );

  const handleClickMenu = ( id: string ) => {
    setCollapsingSubmenu();
    onCollapseSubmenu( id, ( menuItemStatus === 'show' ? false : true ) );
  }

  const setCollapsingSubmenu = useCallback(() => {
    setSubmenuIsCollapsing( true );
      
    setTimeout(() => {
      setMenuItemStatus( menuItemStatus === 'show' ? 'hide' : 'show' );
      setSubmenuIsCollapsing( false );
    }, 150);
  }, [ menuItemStatus ] );

  useEffect(() => {
    if( submenuIsCollapsing ) {
      if( menuItemStatus === 'hide' ) {
        setCustomStyle({
          height: ( menuItem.subitem?.header ? 60 : 0 ) + ( menuItem.subitem ? menuItem.subitem.items.length * 36 : 0 )
        });
      } else {
        setCustomStyle({});
      }
    } else {
      if( menuItemStatus === 'show' ) {
        setCustomStyle({
          height: ( menuItem.subitem?.header ? 60 : 0 ) + ( menuItem.subitem ? menuItem.subitem.items.length * 36 : 0 )
        });
      } else {
        setCustomStyle({});
      }
    }
  }, [ submenuIsCollapsing, menuItem.subitem, menuItemStatus ]);

  useEffect(() => {
    if( !menuItem.subitem?.isOpen && menuItemStatus === 'show' ) {
      setCollapsingSubmenu();
    }
  }, [ menuItem ]);

  useEffect(() => {
    if( !menuItem.subitem ) return;
    setIsPathMatch( menuItem.subitem.items.findIndex( item => item.redirection === location.pathname ) > -1 ? true : false );
  }, [ location, menuItem.subitem ]);

  useEffect(() => {
    if( isPathMatch && menuItemStatus === 'hide' && !menuState.isSidebarCollapsed ) {
      handleClickMenu( menuItem.item.id );
    } else if( !isPathMatch && menuItemStatus === 'show' ) {
      handleClickMenu( menuItem.item.id );
    }
  }, [ isPathMatch ]);

  return {
    customStyle,
    menuItemStatus,
    submenuIsCollapsing,
    isPathMatch,
    handleClickMenu,
    // handleClickSubmenu,
  };
}