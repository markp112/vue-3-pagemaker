import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { Units } from '@/common/types/units';


export type ComponentTypesString =
  | undefined
  | 'container'
  | 'jumbo'
  | 'button'
  | 'navBar'
  | 'pageTemplate'
  | 'text'
  | 'image';

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

export interface SideBarElementFlattend {
  componentName: string;
  dimension: {
    height: number,
    width: number,
    units: Units,
  };
  location: {
    top: number,
    left: number,
    units: Units,
  };
  classes: string;
  componentRef: string;
  isContainer: boolean;
  sidebarIcon: string;
  type: ComponentTypesString;
}


// export interface SidebarElementWithDefaultContent extends SidebarElement {
//   content: ComponentTypesString
// }
