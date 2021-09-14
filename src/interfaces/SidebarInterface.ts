export interface SidebarMenu {
  item    : SidebarItem;
  icon    : string;
  subitem?: SidebarSubmenu;
}

export interface SidebarItem {
  id          : string;
  name        : string;
  active      : boolean;
  redirection : string;
}

export interface SidebarSubmenu {
  header: string;
  isOpen: boolean;
  items : SidebarItem[];
}

export interface SidebarState {
  menu               : SidebarMenu[];
  isSidebarCollapsed : boolean;
}