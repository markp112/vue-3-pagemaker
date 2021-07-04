// import { ButtonRequestTypes } from '@/models/styles/button-factory/button-factory';
// import {
//   ButtonIconClassList,
//   ButtonIconClassListBuilder
// } from '@/models/styles/builders/button-icon-class-list';
// import {
//   shadowIconList,
//   borderEdgeIconList,
//   lineStyleIconList,
//   fontWeightIconList,
//   IconPickerInterface
// } from '@/models/components/icon-picker-models';
// import { ButtonIconClassInterface } from '../button-icon/button-icon';
// import { ButtonIconClassBuilder } from './button-icon-class-builder';
// import { StyleTypes } from '@/classes/text-attributes/text-attributes';
// import { ImpactedAttributeTypes } from '@/classes/sidebarButtonEventManager/sidebarButtonEventManager';

import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { CssStyleTypes } from '@/common/types/css-element-styles/css-element-styles';
import { shadowIconList, borderEdgeIconList, lineStyleIconList, fontWeightIconList } from '@/components/core/sidebar/panel-buttons/data';
import { IconPickerInterface } from '@/components/core/sidebar/panel-buttons/models/icon-picker';
import { ButtonIconClassListBuilder } from '../button-types/button-icon-class-list/builder';
import { ButtonIconClassList } from '../button-types/button-icon-class-list/button-icon-class-list';
import { ButtonIconClassBuilder } from '../button-types/button-icon-class/button-icon-class';
import { ButtonIconClassInterface } from '../button-types/model';
import { ButtonRequestTypes } from '../types';

export class ButtonIconBuilder {
  build(whichButton: ButtonRequestTypes): ButtonIconClassList {
    switch (whichButton) {
      case 'Shadow':
        return this.buildIconList(
          'shadow',
          'shadow',
          shadowIconList,
          'shadows',
          'shadows-32.png'
        );
      case 'border-direction':
        return this.buildIconList(
          'border',
          'borderEdge',
          borderEdgeIconList,
          'border edge',
          'border_all-32.png'
        );
      case 'border-styles':
        return this.buildIconList(
          'border',
          'borderStyle',
          lineStyleIconList,
          'border style',
          'sketch-32.png'
        );
      case 'font-weight':
        return this.buildIconList(
          'text',
          'fontWeight',
          fontWeightIconList,
          'font weight',
          'font_bold-32.png'
        );
      default:
        throw new Error('ButtonIconBuilder: unknown Button List Type');
    }
  }

  private buildIconList(
    styledElement: ImpactedAttributeTypes,
    classType: CssStyleTypes,
    iconList: IconPickerInterface[],
    toolTip: string,
    iconImage: string
  ): ButtonIconClassList {
    const icons: ButtonIconClassInterface[] = [];
    iconList.forEach(icon => {
      const biCB: ButtonIconClassInterface = new ButtonIconClassBuilder()
        .withClassNameActive(icon.class)
        .withIconImage(icon.icon)
        .withToolTip(icon.tooltip)
        .build();
      icons.push(biCB);
    });
    return new ButtonIconClassListBuilder()
      .withStyledElement(styledElement)
      .withClassType(classType)
      .withIconImage(iconImage)
      .withToolTip(toolTip)
      .withClassNames(icons)
      .build();
  }
}
