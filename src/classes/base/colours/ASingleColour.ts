import { ColourProperties } from './colour-properties-types';
import { AColour } from './material-colours';

export type ColourStyle = 
| 'background-color'
| 'color'
| 'border-color'

export class ASingleColour implements AColour {
  _colourName: ColourProperties;
  _value: string;

  constructor(colourName: ColourProperties, value: string) {
    this._colourName = colourName;
    this._value = value;
  }

  get colourName(): ColourProperties {
    return this._colourName;
  }

  get value(): string {
    return this._value;
  }

  toCssStyle(type: ColourStyle): string {
    return `${type}:${this._value};`;
  }

}