import { MaterialColoursInterface } from '../../base/colours/material-colours';
import { SiteDefaultsInterface } from './models/SiteDefaultSettings';
import { TypographyInterface } from './models/typography';

export class SiteDefaults implements SiteDefaultsInterface {
  colours: MaterialColoursInterface;
  typography: TypographyInterface;
  userId: string;
  siteId: string;
  private _colours: MaterialColoursInterface;
  private _typography: TypographyInterface;;

  
}