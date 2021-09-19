import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ButtonIconBuilder } from '../builder';
import { ButtonIconClassList } from '../button-types/button-icon-class-list/button-icon-class-list';
import { ButtonIconClassWrapper } from '../button-types/button-icon-class/button-icon-class';
import { ButtonIconDimensionBuilder } from '../button-types/button-icon-dimensions/builder';
import { ButtonIconDimension } from '../button-types/button-icon-dimensions/button-icon-dimension';
import { ButtonIconNumericBuilderWrapper } from '../button-types/button-icon-numeric/builder';
import { ButtonIconNumeric } from '../button-types/button-icon-numeric/button-icon-numeric';
import { ButtonIconClassInterface } from '../button-types/model';
import { ButtonRequestTypes } from '../types';

export type ButtonReturnTypes =
  | ButtonIconClassList
  | ButtonIconNumeric
  | ButtonIconClassInterface
  | ButtonIconDimension;

// export type ButtonRequestTypes =
//   | 'Shadow'
//   | 'border-styles'
//   | 'border-direction'
//   | 'font-weight'
//   | 'font-size'
//   | 'italic-button'
//   | 'underline-button'
//   | 'border-radius'
//   | 'border-thickness'
//   | 'margin-left'
//   | 'margin-right'
//   | 'margin-top'
//   | 'margin-bottom'
//   | 'padding';

export type ClassOfButton = 'class-list' | 'numeric' | 'class' | 'dimension' | 'padding' ;

export class ButtonFactory {
  public createButton(
    type: ClassOfButton,
    whichButton: ButtonRequestTypes
  ): ButtonReturnTypes {
    switch (type) {
      case 'class-list':
        return this.buildClassList(whichButton);
      case 'numeric':
        return this.buildNumeric(whichButton);
      case 'class':
        return this.buildClass(whichButton);
      case 'dimension':
        return this.buildDimension();
      case 'padding':
        return this.buildPadding();
    }
  }

  private buildClassList(whichButton: ButtonRequestTypes): ButtonIconClassList {
    return new ButtonIconBuilder().build(whichButton);
  }

  private buildNumeric(whichButton: ButtonRequestTypes): ButtonIconNumeric {
    return new ButtonIconNumericBuilderWrapper().build(whichButton);
  }

  private buildClass(
    whichButton: ButtonRequestTypes
    ): ButtonIconClassInterface {
    console.log('%c⧭', 'color: #1d5673', whichButton);

    return new ButtonIconClassWrapper().build(whichButton);
  }

  private buildDimension(): ButtonIconDimension {
    return new ButtonIconDimensionBuilder()
      .withComponentName('plus-minus')
      .withDimension(new ADimension())
      .withIconImage('thickness-32.png')
      .withToolTip('border thickness')
      .withStyle('border-width', '')
      .build();
  }

  private buildPadding(): ButtonIconDimension {
    return new ButtonIconDimensionBuilder()
      .withComponentName('plus-minus')
      .withDimension(new ADimension())
      .withIconImage('padding-32.png')
      .withToolTip('padding')
      .withStyle('padding', '')
      .build();
  }
}
