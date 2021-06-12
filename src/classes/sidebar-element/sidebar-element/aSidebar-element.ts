import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';
import { ComponentTypesString, SidebarElement } from './model/sidebar-element';

const DEFAULT_VALUE: ValueAndUnit = { value: 0, unit: 'px' };

export class ASidebarElement implements SidebarElement {
  componentName = "";
  classes = "";
  componentRef = "container";
  isContainer = true;
  sidebarIcon = '';
  type: ComponentTypesString = 'container';
  location = new ALocation(DEFAULT_VALUE, DEFAULT_VALUE);
  dimension = new ADimension(DEFAULT_VALUE, DEFAULT_VALUE);

  toObject(): Record<string, any> {
    return {
      componentName: this.componentName,
      class: this.classes,
      isContainer: this.isContainer,
      sidebarIcon: this.sidebarIcon,
      componentRef: this.componentRef,
      type: this.type,
      dimension: this.dimension.toObject(),
      location: this.location.toObject(),
    };
  }
}
