import { Style } from '../../style/style';
import { ColourInterface } from '../models/colour';
import { BackgroundBorderForeground } from './types';

export class Colour implements ColourInterface {
  _rgbColour = '#ffeedd';
  _backgroundBorderForeground: BackgroundBorderForeground = 'color';

  private static instance: Colour;

  public static getInstance(): Colour {
    if (!Colour.instance) {
      Colour.instance = new Colour();
    }
    return Colour.instance;
  }

  applyStyle(style: Style) {
    this._rgbColour = style.value;
    this._backgroundBorderForeground = style.style as BackgroundBorderForeground;
  }

  set rgbColour(colour: string) {
    this._rgbColour = colour;
  }

  get rgbColour(): string {
    return this._rgbColour;
  }

  get backgroundBorderForeground(): BackgroundBorderForeground {
    return this._backgroundBorderForeground;
  }

  set backgroundBorderForeground(bfb: BackgroundBorderForeground) {
    this._backgroundBorderForeground = bfb;
  }
}
