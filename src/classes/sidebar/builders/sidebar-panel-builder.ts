import { SidebarPanel } from '../classes/sidebar-panel';
import { ContainerEditorBuilder } from './containers-editor';
import { SiteSettingsBuilder } from './site-settings-builder';

export type SidebarComponents =
  | "image-editor"
  | "sidebar-components"
  | "container-editor"
  | "sites-menu"
  | "button-editor"
  | "site-settings";

export class SidebarPanelBuilder {
  sidebarPanel: SidebarPanel = new SidebarPanel();

  constructor();
  constructor(sidebarToCreate:SidebarComponents);
  constructor(sidebarToCreate?: SidebarComponents) {
    if(sidebarToCreate) {
      this.sidebarPanel = new SidebarPanel();
      switch (sidebarToCreate) {
        case "container-editor":
          this.sidebarPanel = this.buildContainerSidePanel();
          break;
        case "site-settings":
          this.sidebarPanel = this.buildSiteSettings();
          break;
      }
    }
  }

  private buildContainerSidePanel(): SidebarPanel {
    const builder = new ContainerEditorBuilder();
    return builder.build();
  }

  private buildSiteSettings(): SidebarPanel {
    const builder = new SiteSettingsBuilder();
    return builder.build();
  }
}
