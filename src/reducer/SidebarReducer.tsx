import { SidebarState } from '../interfaces/SidebarInterface';

type Actions = 
  | { type: 'collapse-menu' }
  | { type: 'collapse-submenu', payload: { id: string, isOpen: boolean } }
  | { type: 'select-option-menu', payload: string }

export const SidebarReducer = ( state: SidebarState, action: Actions ): SidebarState => {
  switch ( action.type ) {
    case 'collapse-menu':
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      };

    case 'collapse-submenu':
      return {
        ...state,
        menu: state.menu.map( item => {
          return item.item.id === action.payload.id
            ? { ...item, isOpen: action.payload.isOpen }
            : { ...item, isOpen: false }
        }),
      };

    case 'select-option-menu':
      return {
        ...state,
        menu: state.menu.map( menuItem => {
          if( menuItem.item.id === action.payload ) {
            menuItem.item.active = true;
          } else {
            menuItem.item.active = false;
          }
          return menuItem;
        }),
      };
  
    default:
      return state;
  }
}