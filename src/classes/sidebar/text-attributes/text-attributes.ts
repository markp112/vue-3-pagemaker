import { Style } from '@/classes/base/style/style';
import { Units } from '@/common/types/units';

export class TextAttributes {
  private static instance: TextAttributes;
  classOrStyle: 'class' | 'style' | 'undefined' = 'undefined';
  italic = false;
  underline = false;
  style = '';
  value = '';
  units: Units | undefined;

  public static getInstance(): TextAttributes {
    if (!TextAttributes.instance) {
      TextAttributes.instance = new TextAttributes();
    }
    return TextAttributes.instance;
  }

  applyStyle(styleElement: Style): void {
    this.style = styleElement.style;
    this.units = 'px';
    this.value = styleElement.value;
    this.classOrStyle = 'style';
    switch (styleElement.style) {
      case 'font-size':
        this.units = styleElement.unit;
        break;
      case 'padding':
        this.units = styleElement.unit;
        break;
      case 'fontWeight':
        this.classOrStyle = 'class';
        break;
      case 'italic':
        this.classOrStyle = 'class';
        break;
      case 'not-italic':
        this.classOrStyle = 'class';
        break;
      case 'underline':
        this.classOrStyle = 'class';
        break;
      case 'no-underline':
        this.classOrStyle = 'class';
        break;
    }
  }
}
