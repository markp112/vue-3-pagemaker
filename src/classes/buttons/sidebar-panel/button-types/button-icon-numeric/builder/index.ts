import { Style } from '@/classes/base/style/style';
import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { StyleTags } from '@/common/types/css-element-styles/css-element-styles';
import { Units } from '@/common/types/units';
import { ButtonRequestTypes } from '../../../types';
import { IconType, ComponentNames } from '../../types';
import { ButtonIconNumeric } from '../button-icon-numeric';

export class ButtonIconNumericBuilder {
  _styledElement: ImpactedAttributeTypes = 'undefined';
  _valuesList: string[] = [];
  _defaultValue = '0';
  _style: Style = {
    style: 'font-size',
    value: '0'
  };
  _iconImage = '';
  _tooltip = '';
  _iconIsTypeOf: IconType = 'style';
  _componentName: ComponentNames = 'drop-down';
  _units: Units = 'px';

  withStyledElement(styledElement: ImpactedAttributeTypes) {
    this._styledElement = styledElement;
    return this;
  }

  withValuesList(valuesList: string[]) {
    this._valuesList = valuesList;
    return this;
  }

  withDefaultValue(defaultValue: string) {
    this._defaultValue = defaultValue;
    return this;
  }

  withStyle(styleName: StyleTags, value: string) {
    this._style = {
      style: styleName,
      value: value
    };
    return this;
  }

  withIconImage(iconImage: string) {
    this._iconImage = iconImage;
    return this;
  }

  withTooltip(tooltip: string) {
    this._tooltip = tooltip;
    return this;
  }

  withIconIsOfType(type: IconType) {
    this._iconIsTypeOf = type;
    return this;
  }

  withComponentName(componentName: ComponentNames) {
    this._componentName = componentName;
    return this;
  }

  withUnits(units: Units) {
    this._units = units;
    return this;
  }

  build() {
    return new ButtonIconNumeric(this);
  }
}

export class ButtonIconNumericBuilderWrapper {
  fontSizes = [
    '6',
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '18',
    '20',
    '24',
    '26',
    '28',
    '36',
    '48',
    '72'
  ];
  units = ['px', 'em', '%'];

  build(whichButton: ButtonRequestTypes): ButtonIconNumeric {
    switch (whichButton) {
      case 'border-radius':
        return this.buildButton(
          'bezier-32.png',
          this.units,
          'px',
          whichButton,
          '0px',
          'px'
        );
      case 'font-size':
        return this.buildButton(
          '',
          this.fontSizes,
          '16',
          whichButton,
          '16',
          'px'
        );
      case 'margin-left':
        return this.buildButton(
          'margin-left-32.png',
          this.units,
          'px',
          whichButton,
          '0',
          'px'
        );
      case 'margin-right':
        return this.buildButton(
          'margin-right-32.png',
          this.units,
          'px',
          whichButton,
          '0',
          'px'
        );
      case 'margin-top':
        return this.buildButton(
          'margin-top-32.png',
          this.units,
          'px',
          whichButton,
          '0',
          'px'
        );
      case 'margin-bottom':
        return this.buildButton(
          'margin-bottom-32.png',
          this.units,
          'px',
          whichButton,
          '0',
          'px'
        );
      default:
        throw new Error('Unrecognised Numeric Button Type');
    }
  }

  private buildButton(
    iconImage: string,
    valuesList: string[],
    defaultvalue: string,
    styleName: StyleTags,
    styleValue: string,
    units: Units
  ) {
    return new ButtonIconNumericBuilder()
      .withIconImage(iconImage)
      .withValuesList(valuesList)
      .withDefaultValue(defaultvalue)
      .withStyle(styleName, styleValue)
      .withUnits(units)
      .build();
  }
}
