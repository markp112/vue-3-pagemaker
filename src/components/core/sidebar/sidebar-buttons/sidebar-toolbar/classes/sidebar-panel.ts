import { SidebarToolbar } from '@/classes/sidebar/classes/sidebar-toolbar';
import { SidebarPanelInterface } from '@/classes/sidebar/model/sidebar-panel';

/**
 * @description contains the list of toolbars to display for the given sidepanel
 * */
 export class SidebarPanel implements SidebarPanelInterface {
  sidebarPanels: SidebarToolbar[] = [];

  addToolbar(toolbar: SidebarToolbar) {
    this.sidebarPanels.push(toolbar);
  }
}
