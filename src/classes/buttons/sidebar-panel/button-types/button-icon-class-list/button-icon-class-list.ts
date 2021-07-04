import { Style } from '@/classes/base/style/style';
import { ImpactedAttributeTypes, SidebarButtonEventManager } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { CssStyleTypes } from '@/common/types/css-element-styles/css-element-styles';
import { ButtonIconClassListInterface, ButtonIconClassInterface } from '../model';
import { IconType, ComponentNames } from '../types';
import { ButtonIconClassListBuilder } from './builder';

export class ButtonIconClassList implements ButtonIconClassListInterface {
  styledElement: ImpactedAttributeTypes;
  classType: CssStyleTypes;
  classNames: ButtonIconClassInterface[];
  iconImage: string;
  tooltip: string;
  iconIsTypeOf: IconType;
  componentName: ComponentNames;
  private eventManager = SidebarButtonEventManager.getInstance();

  constructor(bICLBuilder: ButtonIconClassListBuilder) {
    this.styledElement = bICLBuilder._styledElement;
    this.classType = bICLBuilder._classType;
    this.classNames = bICLBuilder._classNames;
    this.componentName = bICLBuilder._componentName;
    this.iconImage = bICLBuilder._iconImage;
    this.iconIsTypeOf = bICLBuilder._iconIsTypeOf;
    this.tooltip = bICLBuilder._tooltip;
  }

  update(iconElement: ButtonIconClassInterface) {
    const style: Style = {
      style: this.classType,
      value: iconElement.classNameActive,
      unit: 'px',
    };
    this.eventManager.applyValue(this.styledElement, style);
  }
}
