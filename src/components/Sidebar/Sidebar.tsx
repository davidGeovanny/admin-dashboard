import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarContext } from '../../context/SidebarContext';
import brissa_logo from '../../assets/img/brissa_logo.png';

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
        <div className='sidebar-brand-icon'>
          <img src={ brissa_logo } alt='logo brissa' className='sidebar-logo' />
        </div>

        <div className='sidebar-brand-text mx-3'><div>Brissa</div><sup>Agua Hielo</sup></div>

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