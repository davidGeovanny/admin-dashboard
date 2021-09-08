import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { SidebarReducer } from '../reducer/SidebarReducer';
import { SidebarState } from '../interfaces/SidebarInterface';
import { menu } from '../data/menu';

interface ContextProps {
  menuState         : SidebarState;
  onCollapseSidebar : () => void;
  onClickMenu       : ( id: string, redirectTo: string ) => void;
  onCollapseSubmenu : ( id: string, isOpen: boolean ) => void;
}

const initSidebarState: SidebarState = {
  menu,
  isSidebarCollapsed: false,
};

export const SidebarContext = createContext( {} as ContextProps );

export const SidebarProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [ sidebarState, dispatch ] = useReducer( SidebarReducer, initSidebarState );

  const onCollapseSidebar = () => {
    dispatch({ type: 'collapse-menu' });
  }
  
  const onCollapseSubmenu = ( id: string, isOpen: boolean ) => {
    dispatch({
      type: 'collapse-submenu',
      payload: { id, isOpen }
    });
  }

  const onClickMenu = ( id: string, redirectTo: string ) => {
    dispatch({
      type: 'select-option-menu',
      payload: id
    });

    history.push( redirectTo );
  }

  return (
    <SidebarContext.Provider
      value={{
        menuState: sidebarState,
        onCollapseSidebar,
        onCollapseSubmenu,
        onClickMenu,
      }}
    >
      { children }
    </SidebarContext.Provider>
  );
}