import React, { useContext } from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarContext } from '../context/SidebarContext';

export const Sidebar = () => {

  const { menuState, onCollapseSidebar } = useContext( SidebarContext );
  const { isSidebarCollapsed, menu } = menuState;

  return (
    <div>
      <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${ isSidebarCollapsed && 'toggled' }`}>
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          
          {/* Sidebar - Brand */}
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>

          <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>

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
            id="sidebarToggle"
            className="rounded-circle border-0" 
            onClick={ onCollapseSidebar }
          ></button>
        </div>

      </ul>
    </div>
  )
}
