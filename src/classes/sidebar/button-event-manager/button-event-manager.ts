
import { Colour } from '@/classes/base/colours/component-colour/component-colour';
import { Style } from '@/classes/base/style/style';
import { StyleTags } from '@/common/types/css-element-styles/css-element-styles';
import { useStore } from 'vuex';
import { Border } from '../border-attributes/border-attributes';
import { TextAttributes } from '../text-attributes/text-attributes';

export type ImpactedAttributeTypes =
  | 'border'
  | 'text'
  | 'colour'
  | 'shadow'
  | 'undefined';

export class SidebarButtonEventManager {
  private static instance: SidebarButtonEventManager;
  impactedAtrribute: ImpactedAttributeTypes = 'undefined';

  store = useStore();

  public static getInstance(): SidebarButtonEventManager {
    if (!SidebarButtonEventManager.instance) {
      SidebarButtonEventManager.instance = new SidebarButtonEventManager();
    }
    return SidebarButtonEventManager.instance;
  }

  applyValue(
    impactedAtrribute: ImpactedAttributeTypes,
    styleElement: Style
  ) {
    this.impactedAtrribute = impactedAtrribute;
    const colour = Colour.getInstance();
    const border: Border = Border.getInstance();
    const textAttribute: TextAttributes = TextAttributes.getInstance();
    switch (impactedAtrribute) {
      case 'text':
        textAttribute.applyStyle(styleElement);
        break;
      case 'border':
        border.applyStyle(styleElement);
        break;
      case 'shadow':
        border.applyStyle(styleElement);
        break;
      case 'colour':
        colour.applyStyle(styleElement);
        break;
      default:
        break;
    }
  }

  updateEditedComponent() {
    switch (this.impactedAtrribute) {
      case 'text':
        this.applyTextStyle();
        break;
      case 'border':
        this.applyBorderStyle();
        break;
      case 'shadow':
        this.applyShadowClass();
        break;
      case 'colour':
        this.applyColour();
        break;
      default:
        throw new Error('Unrecognised Event Manager type');
    }
  }
  /** @description retrieve the values set on the textAttributes and apply them
   * to the edited component
   */
  private applyTextStyle() {
    const textAttribute: TextAttributes = TextAttributes.getInstance();
    const styleName = textAttribute.style as StyleTags;
    const style: Style = {
      style: styleName,
      value: `${textAttribute.value}${textAttribute.units}`
    };
    switch (textAttribute.classOrStyle) {
      case 'class':
        this.store.getters.editedComponent!.addClass(textAttribute.value);
        break;
      case 'style':
        this.store.getters.editedComponent!.addStyle(style);
        break;
    }
  }

  private applyBorderStyle() {
    const border: Border = Border.getInstance();
    this.store.getters.editedComponent!.addStyle(border.getStyle());
    this.store.getters.editedComponent!.addStyle(border.getBorderRadius());
  }

  private applyShadowClass() {
    const border: Border = Border.getInstance();
    this.store.getters.editedComponent!.addClass(border.getShadow());
  }

  private applyColour() {
    const colour: Colour = Colour.getInstance();
    if (colour.backgroundBorderForeground !== 'border-color') {
      const style: Style = {
        style: colour.backgroundBorderForeground,
        value: colour.rgbColour
      };
      this.store.getters.editedComponent!.addStyle(style);
    } else {
      const borderDefintion = Border.getInstance();
      borderDefintion.colour = colour.rgbColour;
      this.store.getters.editedComponent!.addStyle(borderDefintion.getStyle());
    }
  }
}
