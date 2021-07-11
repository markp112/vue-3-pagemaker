import { PageElementClasses } from '../../factory/page-elements-factory';
import { PageElementInterface } from '../../page-element-base/model/page-element';
import { PageElement } from '../../page-element-base/page-element-base';

export type ContainerOrientation = "column" | "row";
export interface PageContainerInterface extends PageElementInterface {
  elements: PageElementClasses[];
  containerOrientation: ContainerOrientation;
  getWidthOfAllComponents(): number;
  getHeightOfAllComponents(): number;
}
