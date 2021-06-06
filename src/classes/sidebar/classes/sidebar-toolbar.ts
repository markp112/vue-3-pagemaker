import { SidebarToolbarInterface } from '../model/sidebar-toolbar';
import { SidebarIcon } from './sidebar-icon';


/** @description contains the list of icons that make up a toolbar  */
export class SidebarToolbar implements SidebarToolbarInterface {
  toolbarIcons: SidebarIcon[] = [];
  private _toolbarTitle = "";

  addIcon(icon: string, className: string, tooltip = "") {
    const sidebarIcon = new SidebarIcon(icon, className, tooltip);
    this.toolbarIcons.push(sidebarIcon);
  }

  get toolbarTitle(): string {
    return this._toolbarTitle;
  }

  set toolbarTitle(toolbarTitle: string) {
    this._toolbarTitle = toolbarTitle;
  }
}
