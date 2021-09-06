import { useCallback, useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import { SidebarMenu } from '../interfaces/SidebarInterface';

type MenuItemAction = 'show' | 'hide';

export const useSidebarMenuItem = ( menuItem: SidebarMenu ) => {
  const { onCollapseSubmenu, onClickMenu } = useContext( SidebarContext );

  const [ submenuIsCollapsing, setSubmenuIsCollapsing ] = useState<boolean>( false );
  const [ menuItemStatus, setMenuItemStatus ] = useState<MenuItemAction>('hide');
  const [ customStyle, setCustomStyle ] = useState<React.CSSProperties>();

  const handleClickMenu = ( id: string ) => {
    if( menuItem.subitem ) {
      setCollapsingSubmenu();
      
      onCollapseSubmenu( id, ( menuItemStatus === 'show' ? false : true ) );
    } else {
      onClickMenu( id );
    }
  }

  const setCollapsingSubmenu = useCallback(() => {
    setSubmenuIsCollapsing( true );
      
    setTimeout(() => {
      setMenuItemStatus( menuItemStatus === 'show' ? 'hide' : 'show' );
      setSubmenuIsCollapsing( false );
    }, 150);
  }, [ menuItemStatus ] );
  
  const handleClickSubmenu = ( id: string, subId: string ) => {
    onClickMenu( id, subId );
  }

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

  return {
    customStyle, 
    menuItemStatus, 
    submenuIsCollapsing, 
    handleClickMenu, 
    handleClickSubmenu, 
  };
}