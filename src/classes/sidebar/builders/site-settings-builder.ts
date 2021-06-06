
import { SidebarPanel } from '../classes/sidebar-panel';
import { SidebarToolbar } from '../classes/sidebar-toolbar';
import { SidebarPanelBuilderInterface } from '../model/sidebar-panel-builder';

export class SiteSettingsBuilder implements SidebarPanelBuilderInterface {
  private buildSiteSettings(): SidebarToolbar {
    const sideBarToolbar: SidebarToolbar = new SidebarToolbar();
    sideBarToolbar.addIcon(
      "site-settings-48.png",
      "site-settings",
      "Set site defaults"
    );
    sideBarToolbar.addIcon(
      "art_palette-48.png",
      "colour-palette",
      "Edit colour palatte"
    );
    return sideBarToolbar;
  }

  build(): SidebarPanel {
    const sidebarPanel: SidebarPanel = new SidebarPanel();
    sidebarPanel.addToolbar(this.buildSiteSettings());
    return sidebarPanel;
  }
}
