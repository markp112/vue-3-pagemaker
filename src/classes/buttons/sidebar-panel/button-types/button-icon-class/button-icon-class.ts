import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { CssStyleTypes } from '@/common/types/css-element-styles/css-element-styles';
import { ButtonRequestTypes } from '../../types';
import { ButtonIconClassInterface } from '../model';
import { IconType, ComponentNames } from '../types';

export class ButtonIconClassBuilder {
  _styledElement: ImpactedAttributeTypes = 'undefined';
  _iconImage = '';
  _tooltip = '';
  _classNameActive: CssStyleTypes = 'undefined';
  _classNameInActive: CssStyleTypes = 'undefined';
  _iconIsTypeOf: IconType = 'class';
  _componentName: ComponentNames = 'icon-picker';

  build(): ButtonIconClassInterface {
    return {
      styledElement: this._styledElement,
      iconImage: this._iconImage,
      tooltip: this._tooltip,
      classNameActive: this._classNameActive,
      classNameInActive: this._classNameInActive,
      componentName: this._componentName,
      iconIsTypeOf: this._iconIsTypeOf
    };
  }

  withStyledElement(styledElement: ImpactedAttributeTypes) {
    this._styledElement = styledElement;
    return this;
  }

  withClassNameActive(className: CssStyleTypes) {
    this._classNameActive = className;
    return this;
  }

  withClassNameInActive(className: CssStyleTypes) {
    this._classNameInActive = className;
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

  withIconIsTypeOf(iconType: IconType) {
    this._iconIsTypeOf = iconType;
    return this;
  }

  withComponentName(componentName: ComponentNames) {
    this._componentName = componentName;
    return this;
  }
}

export class ButtonIconClassWrapper {
  build(whichButton: ButtonRequestTypes) {
    switch (whichButton) {
      case 'italic-button':
        return new ButtonIconClassBuilder()
          .withStyledElement('text')
          .withClassNameActive('italic')
          .withClassNameInActive('not-italic')
          .withIconImage('font_italic-32.png')
          .withToolTip('italic')
          .withComponentName('icon-toggle-button')
          .withIconIsTypeOf('class')
          .build();
      case 'underline-button':
        return new ButtonIconClassBuilder()
          .withStyledElement('text')
          .withClassNameActive('underline')
          .withClassNameInActive('no-underline')
          .withIconImage('font_underlined-32.png')
          .withToolTip('underline')
          .withComponentName('icon-toggle-button')
          .withIconIsTypeOf('class')
          .build();
      default:
        throw new Error(
          `Button Icon Class does not recognise button of type ${whichButton}`
        );
    }
  }
}
