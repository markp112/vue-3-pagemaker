import { SidebarIcon } from '@/classes/sidebar/classes/sidebar-icon';
import { SidebarToolbar } from '@/classes/sidebar/classes/sidebar-toolbar';

export interface SidebarIconInterface {
  icon: string;
  className: string;
  toolTip: string;
}

export interface SidebarToolbarInterface {
  toolbarIcons: SidebarIcon[];
  toolbarTitle: string;
}

export interface SidebarPanelInterface {
  sidebarPanels: SidebarToolbar[];
}
