import { ADimension } from '@/classes/base/dimension/a-dimension';
import { Dimension } from '@/classes/base/dimension/model/dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { Location } from '@/classes/base/location/model/location';


export type ComponentTypesString =
  | undefined
  | 'container'
  | 'jumbo'
  | 'button'
  | 'navBar'
  | 'pageTemplate'
  | 'text'
  | 'image'
  | 'rootContainer';

  export const ComponentTypesArray: string[] =
    ['container',
    'jumbo',
    'button',
    'navBar',
    'pageTemplate',
    'text',
    'image',
  ];

export interface SidebarElement {
  componentName: string;
  dimension: ADimension;
  location: ALocation;
  classes: string;
  componentRef: string;
  isContainer: boolean;
  sidebarIcon: string;
  type: ComponentTypesString;
};

// flattens the internal classes to their interfaces
export interface SideBarElementFlattend {
  componentName: string;
  dimension: Dimension;
  location: Location;
  classes: string;
  componentRef: string;
  isContainer: boolean;
  sidebarIcon: string;
  type: ComponentTypesString;
}
