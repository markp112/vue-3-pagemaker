

export type ColourSchemes =
  | "Analogous"
  | "Complementary"
  | "Triadic"
  | "Compound";
  
export interface PalettesInterface {
  colour: string;
  colourScheme: ColourSchemes;
  primary: string[];
  secondary: string[];
  accent: string[];
}
