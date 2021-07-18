import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { ComponentTypesString, SidebarElement } from './model/sidebar-element';

export class ASidebarElement implements SidebarElement {
  componentName = '';
  classes = '';
  componentRef = 'container';
  isContainer = true;
  sidebarIcon = '';
  type: ComponentTypesString = 'container';
  location;
  dimension;
  tooltip = '';

  constructor() {
    this.location = new ALocation();
    this.dimension = new ADimension();
  }

  toObject(): Record<string, any> {
    return {
      componentName: this.componentName,
      classes: this.classes ? this.classes : ' ',
      isContainer: this.isContainer,
      sidebarIcon: this.sidebarIcon,
      componentRef: this.componentRef,
      type: this.type,
      dimension: this.dimension.toObject(),
      location: this.location.toObject(),
      tooltip: this.tooltip,
    };
  }
}
