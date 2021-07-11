import { ColourProperties } from '../component-colour/types/colour-properties-types';

export interface AColour {
  colourName: ColourProperties;
  value: string;
};

export interface MaterialColoursInterface {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  surface: string;
  background: string;
  error: string;
  accent: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnSurface: string;
  textOnBackground: string;
  textOnAccent: string;
  textOnError: string;
};
