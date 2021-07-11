import { ActionEvent } from '@/classes/base/action/model/action';
import { Dimension } from '@/classes/base/dimension/model/dimension';
import { Location } from '@/classes/base/location/model/location';
import { Style } from '@/classes/base/style/style';
import { ComponentTypesString } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import { FirebasePageDataTypes } from './types/firebase-types';

// represents the definition of the object the user has dropped on the page
// export interface PageElementInterface {
//   name: string;
//   ref: string;
//   componentHTMLTag: string;
//   isContainer: boolean;
//   styles: Style[];
//   parentRef: string;
//   classDefinition: string;
//   type: ComponentTypesString;
//   location: Location;
//   dimension: Dimension;
//   actionEvent: ActionEvent;
//   content: string;
//   isAbsolute: boolean;
// }

export interface PageElementFirebaseData {
  name: string;
  ref: string;
  componentHTMLTag: string;
  isContainer: boolean;
  styles: Style[];
  parentRef: string;
  classDefinition: string;
  type: ComponentTypesString;
  location: Location;
  dimension: Dimension;
  actionEvent: ActionEvent;
  content: string;
  isAbsolute: boolean;
}

// export interface PageElementImage extends PageElementFirebaseData {
//   naturalSize: Dimension;
//   location: Location;
//   maintainRatio: boolean;
//   scaledSize: Dimension;
//   containerDimensions: Dimension;
// }


export interface ImageElementFirebaseData extends PageElementFirebaseData {
  naturalSize: Dimension /** @description natural size of the image */;
  scaledSize: Dimension /** @description - this is the background image dimension */;
  ratio: number;
  maintainRatio: boolean;
  containerDimensions: Dimension;
  containerLocation: Location;
  location: Location;
};

export interface PageContainerFirebaseData extends PageElementFirebaseData {
  elements: FirebasePageDataTypes[];
};
