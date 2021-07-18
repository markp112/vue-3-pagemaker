// import { ADimension } from '@/classes/dimensions/adimensions';
// import { ImageElement } from "@/classes/page-element/page-components/image-element/ImageElement";
// import { Dimensions } from "@/models/Dimensions/Dimensions";
// import { MousePostion } from "./imageManipulation";

import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { MousePostion } from '../image-manipulator/image-manipulator';

export class ResizeImage {
  private _imageElement: ImageElement;
  private _imageContainer: ADimension;

  constructor(imageElement: ImageElement) {
    this._imageElement = imageElement;
    this._imageContainer = this._imageElement.containerDimensions;
  }

  public resize(deltaChange: MousePostion) {
    this._imageContainer.width.value += deltaChange.x;
    this._imageContainer.height.value += deltaChange.y;
    this._imageContainer = this.containWithinParentElement();
    this.setNewSizes(deltaChange);
  }

  private setNewSizes(deltaChange: MousePostion) {
    this._imageElement.scaledSize.width.value += deltaChange.x;
    this._imageElement.scaledSize.height.value += deltaChange.y;
    this._imageElement.containerDimensions = this._imageContainer;
  }

  private containWithinParentElement(): ADimension {
    const checkedDimensions = this._imageContainer;
    if (checkedDimensions.height.value < 0) {
      checkedDimensions.height.value = 0;
    }
    if (
      checkedDimensions.height.value >
      this._imageElement.parent.dimension.height.value
      ) {
        checkedDimensions.height.value = this._imageElement.parent.dimension.height.value;
      }
      if (checkedDimensions.width.value < 0) {
        checkedDimensions.width.value = 0;
      }
      if (
        checkedDimensions.width.value >
        this._imageElement.parent.dimension.width.value
        ) {
          checkedDimensions.width.value = this._imageElement.parent.dimension.width.value;
        }
    return checkedDimensions;
  }
}
