import { ASingleColour } from './ASingleColour';
import { ColourProperties } from './colour-properties-types';

export interface AColour {
  colourName: ColourProperties;
  value: string;
};

export interface MaterialColoursInterface {
  colours: ASingleColour[];
  addColour(colour: AColour): void;
  getColour(): ASingleColour;
};
