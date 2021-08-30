import React, { useState } from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { menu } from '../data/menu';

export const Sidebar = () => {

  const [ isCollapsed, setIsCollapsed ] = useState( false );

  const onCollapseSidebar = () => {
    setIsCollapsed( !isCollapsed );
  }

  return (
    <div>
      <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${ isCollapsed && 'toggled' }`}>
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
          isCollapsed={ isCollapsed }
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
          isCollapsed={ isCollapsed }
        />

        <SidebarMenuItem
          menuItem={ menu[2] }
          isCollapsed={ isCollapsed }
        />

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button 
            className="rounded-circle border-0" 
            id="sidebarToggle"
            onClick={ onCollapseSidebar }
          ></button>
        </div>

      </ul>
    </div>
  )
}
