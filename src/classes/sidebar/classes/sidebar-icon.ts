import { SidebarIconInterface } from '../model/sidebar-icon';

/**
 * @description consitutes an icon on the toolbar
 * @param icon - the image file that is displayed on the toolbar
 * @param className - tailwind class to be added to the edited element
 * @param toolTip - optional tooltip to show on hover over the icon
 */
 export class SidebarIcon implements SidebarIconInterface {
  icon: string;
  className: string;
  toolTip: string;

  constructor(icon: string, className: string, toolTip: string) {
    this.icon = icon;
    this.className = className;
    this.toolTip = toolTip;
  }
}
