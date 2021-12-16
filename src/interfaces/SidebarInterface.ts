export interface SidebarMenu {
  icon:     string;
  item:     SidebarItem;
  subitem?: SidebarSubmenu;
}

export interface SidebarItem {
  id:          string;
  name:        string;
  redirection: string;
}

export interface SidebarSubmenu {
  header: string;
  isOpen: boolean;
  items:  SidebarItem[];
}

export interface SidebarState {
  menu:               SidebarMenu[];
  isSidebarCollapsed: boolean;
}