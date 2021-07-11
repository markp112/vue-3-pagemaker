import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { CssStyleTypes } from '@/common/types/css-element-styles/css-element-styles';
import { ButtonIconClassInterface } from '../../model';
import { IconType, ComponentNames } from '../../types';
import { ButtonIconClassList } from '../button-icon-class-list';

export class ButtonIconClassListBuilder {
  _styledElement: ImpactedAttributeTypes = "undefined";
  _classType: CssStyleTypes = "undefined";
  _classNames: ButtonIconClassInterface[] = [];
  _iconImage = "";
  _tooltip = "";
  _iconIsTypeOf: IconType = "class-list";
  _componentName: ComponentNames = "icon-picker";

  withStyledElement(impactedAttribute: ImpactedAttributeTypes) {
    this._styledElement = impactedAttribute;
    return this;
  }

  withClassType(classType: CssStyleTypes) {
    this._classType = classType;
    return this;
  }

  withClassNames(classNames: ButtonIconClassInterface[]) {
    this._classNames = classNames;
    return this;
  }

  withIconImage(iconImage: string) {
    this._iconImage = iconImage;
    return this;
  }

  withToolTip(tooltip: string) {
    this._tooltip = tooltip;
    return this;
  }

  build(): ButtonIconClassList {
    return new ButtonIconClassList(this);
  }
}
