import { SidebarState } from '../interfaces/SidebarInterface';

type Actions = 
  | { type: 'collapse-menu' }
  | { type: 'collapse-submenu', payload: { id: string, isOpen: boolean } }

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
  
    default:
      return state;
  }
}