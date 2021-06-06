import { SidebarPanelInterface } from '../model/sidebar-panel';
import { SidebarToolbar } from './sidebar-toolbar';

/**
 * @description contains the list of toolbars to display for the given sidepanel
 * */
export class SidebarPanel implements SidebarPanelInterface {
  sidebarPanels: SidebarToolbar[] = [];

  addToolbar(toolbar: SidebarToolbar) {
    this.sidebarPanels.push(toolbar);
  }
}
