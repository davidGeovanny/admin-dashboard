export interface SidebarMenu {
  item    : SidebarItem;
  icon    : string;
  subitem?: SidebarSubmenu;
  active  : boolean;
}

export interface SidebarItem {
  name        : string;
  redirection : string;
}

export interface SidebarSubmenu {
  header: string;
  items : SidebarItem[];
}