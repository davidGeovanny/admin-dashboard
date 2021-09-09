import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarContext } from '../context/SidebarContext';

export const Sidebar = () => {

  const { menuState, onCollapseSidebar } = useContext( SidebarContext );
  const { isSidebarCollapsed, menu } = menuState;

  return (
    <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${ isSidebarCollapsed && 'toggled' }`}>
      <Link 
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to='/'
      >
        {/* Sidebar - Brand */}
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>

        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </Link>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <SidebarMenuItem
        menuItem={ menu[0] }
      />

      {/* Divider */}
      <hr className="sidebar-divider" />
      
      {/* Heading */}
      <div className="sidebar-heading">
        Interface
      </div>

      {/* Nav Item - Pages Collapse Menu */}
      <SidebarMenuItem
        menuItem={ menu[1] }
      />

      <SidebarMenuItem
        menuItem={ menu[2] }
      />

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button 
          className="rounded-circle border-0 sidebarToggle" 
          onClick={ onCollapseSidebar }
        ></button>
      </div>

    </ul>
  );
}