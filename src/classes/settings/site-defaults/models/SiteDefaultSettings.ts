import { MaterialColoursInterface } from '../../../base/colours/material-colours';
import { TypographyInterface } from './typography';

export interface SiteDefaultsInterface {
  colours: MaterialColoursInterface;
  typography: TypographyInterface;
  userId: string;
  siteId: string;
};
