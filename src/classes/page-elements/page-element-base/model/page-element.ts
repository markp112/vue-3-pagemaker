import { AnActionEvent } from '@/classes/base/action/an-action';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { Style } from '@/classes/base/style/style';
import { ComponentTypesString } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';

export interface PageElementInterface {
  name: string;
  ref: string;
  componentHTMLTag: string;
  isContainer: boolean;
  styles: Style[];
  parentRef: string;
  classDefinition: string;
  type: ComponentTypesString;
  location: ALocation;
  dimension: ADimension;
  actionEvent: AnActionEvent;
  content: string;
  isAbsolute: boolean;
}
