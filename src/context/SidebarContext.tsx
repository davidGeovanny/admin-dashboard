import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { SidebarState } from '../interfaces/SidebarInterface';
import { SidebarReducer } from '../reducer/SidebarReducer';
import { menu } from '../data/menu';

interface ContextProps {
  menuState:         SidebarState;
  onCollapseSidebar: () => void;
  onCollapseSubmenu: ( id: string, isOpen: boolean ) => void;
  redirectTo:        ( url: string ) => void;
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

  const redirectTo = ( url: string ) => {
    console.log( url );
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