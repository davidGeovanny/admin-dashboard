import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarContext } from '../context/SidebarContext';

export const Sidebar = () => {

  const { menuState } = useContext( SidebarContext );
  const { isSidebarCollapsed, menu } = menuState;

  return (
    <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${ isSidebarCollapsed && 'toggled' }`}>
      <Link 
        className='sidebar-brand d-flex align-items-center justify-content-center'
        to='/'
      >
        {/* Sidebar - Brand */}
        <div className='sidebar-brand-icon rotate-n-15'>
          <i className='fas fa-laugh-wink'></i>
        </div>

        <div className='sidebar-brand-text mx-3'>SB Admin <sup>2</sup></div>
      </Link>

      {/* Divider */}
      <hr className='sidebar-divider my-0' />

      {/* Nav Item - Dashboard */}
      <SidebarMenuItem
        menuItem={ menu[0] }
      />

      {/* Divider */}
      <hr className='sidebar-divider' />
      
      {/* Heading */}
      <div className='sidebar-heading'>
        Interface
      </div>

      {/* Nav Item - Pages Collapse Menu */}
      { menu.map( ( item, index ) => {
        if( index > 0 ) {
          return <SidebarMenuItem key={ item.item.id } menuItem={ item } />
        }
        return null;
      } ) }
    </ul>
  );
}