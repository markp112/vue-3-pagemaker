import { ASingleColour } from '../base/colours/ASingleColour';
import { AColour,  MaterialColoursInterface } from '../base/colours/material-colours';

export class SiteColours implements MaterialColoursInterface {
  colours: ASingleColour[];
  addColour(colour: AColour) {
    throw new Error('Method not implemented.');
  }
  getColour(): ASingleColour {
    throw new Error('Method not implemented.');
  }

}