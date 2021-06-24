import { SidebarElement } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import { SidebarElements } from '@/classes/sidebar-element/sidebar-elements/sidebar-elements';
import { SidebarComponentMenus } from '@/common/types/sidebar-component-menus/sidebar-component-menus';

export type State = {
  sidebarElements: SidebarElements,
  showSidebar: boolean;
  sidebarComponent: SidebarComponentMenus,
  showTextModal: boolean,
  settingsPageActivePage: string,  //which page to show when settings is activated
  dragDropEventHandled: boolean,
};

export const state: State = {
  sidebarElements: new SidebarElements,
  showSidebar: false,
  sidebarComponent: 'sidebar-components',
  showTextModal: false,
  settingsPageActivePage: '',
  dragDropEventHandled: false,
};
