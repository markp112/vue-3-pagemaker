
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { Style } from '@/classes/base/style/style';
import { Border } from '@/classes/sidebar/border-attributes/border-attributes';
import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { ButtonIconDimensionInterface } from '../model';
import { ComponentNames, IconType } from '../types';
import { ButtonIconDimensionBuilder } from './builder';

export class ButtonIconDimension implements ButtonIconDimensionInterface {
  styledElement: ImpactedAttributeTypes = 'undefined';
  dimension: ADimension = new ADimension();
  style: Style = {
    style: '',
    value: ''
  };
  iconImage = '';
  tooltip = '';
  iconIsTypeOf: IconType = 'dimension';
  componentName: ComponentNames = 'plus-minus';
  eventClass: Border;

  constructor(buttonIconDimensionBuilder: ButtonIconDimensionBuilder) {
    this.styledElement = buttonIconDimensionBuilder._styledElement;
    this.dimension = buttonIconDimensionBuilder._dimension;
    this.componentName = buttonIconDimensionBuilder._componentName;
    this.iconImage = buttonIconDimensionBuilder._iconImage;
    this.tooltip = buttonIconDimensionBuilder._tooltip;
    this.eventClass = buttonIconDimensionBuilder._eventClass;
    this.style = buttonIconDimensionBuilder._style;
  }
}
