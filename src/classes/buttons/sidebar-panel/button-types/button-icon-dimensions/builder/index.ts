import { ADimension } from '@/classes/base/dimension/a-dimension';
import { Style } from '@/classes/base/style/style';
import { Border } from '@/classes/sidebar/border-attributes/border-attributes';
import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { StyleTags } from '@/common/types/css-element-styles/css-element-styles';
import { IconType, ComponentNames } from '../../types';
import { ButtonIconDimension } from '../button-icon-dimension';

export class ButtonIconDimensionBuilder {
  _styledElement: ImpactedAttributeTypes = 'undefined';
  _dimension: ADimension = new ADimension();
  _iconImage = '';
  _tooltip = '';
  _iconIsTypeOf: IconType = 'dimension';
  _componentName: ComponentNames = 'plus-minus';
  _eventClass: Border = Border.getInstance();
  _style: Style = {
    style: '',
    value: ''
  };

  withStyledElement(styledElement: ImpactedAttributeTypes) {
    this._styledElement = styledElement;
    return this;
  }

  withStyle(style: StyleTags, value: string) {
    this._style.style = style;
    this._style.value = value;
    return this;
  }

  withDimension(dimension: ADimension) {
    this._dimension = dimension
    return this;
  }

  withIconImage(image: string) {
    this._iconImage = image;
    return this;
  }

  withToolTip(toolTip: string) {
    this._tooltip = toolTip;
    return this;
  }

  withComponentName(componentName: ComponentNames) {
    this._componentName = componentName;
    return this;
  }

  build(): ButtonIconDimension {
    return new ButtonIconDimension(this);
  }
}
