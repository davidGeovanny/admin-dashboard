import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import { SidebarReducer } from '../reducer/SidebarReducer';
import { SidebarContextState } from '../interfaces/SidebarInterface';

import { menu } from '../data/menu';

interface ContextProps {
  menuState:         SidebarContextState;
  onCollapseSidebar: () => void;
  onCollapseSubmenu: ( id: string, isOpen: boolean ) => void;
  redirectTo:        ( url: string ) => void;
}

const initSidebarState: SidebarContextState = {
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
      type:    'collapse-submenu',
      payload: { id, isOpen }
    });
  }

  const redirectTo = ( url: string ) => {
    history.push( url );
  }
  
  return (
    <SidebarContext.Provider
      value={{
        menuState: sidebarState,
        onCollapseSidebar,
        onCollapseSubmenu,
        redirectTo,
      }}
    >
      { children }
    </SidebarContext.Provider>
  );
}