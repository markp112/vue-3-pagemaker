import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { ImageBase } from '../image-manipulator/image-base';
import { MousePosition } from '../image-manipulator/image-base';
import ImageManipulation, { ImageManipulationType } from '../model/image-manipulation';

export class ResizeImage  extends ImageBase implements ImageManipulation {
  imageManipulationType: ImageManipulationType = 'resize';

  private _imageContainer: ADimension;

  constructor(imageElement: ImageElement) {
    super(imageElement)
    this._imageContainer = this.imageElement.container.naturalSize;
  }

  applyAction(currentMousePosition: MousePosition) {
    const deltaMouse: MousePosition = this.getDeltaChange(currentMousePosition);
    this.lastMousePosition = { ...currentMousePosition };
    this._imageContainer.width.value += deltaMouse.x;
    this._imageContainer.height.value += deltaMouse.y;
    this._imageContainer = this.containWithinParentElement();
    this.setNewSizes(deltaMouse);
  }

  private setNewSizes(deltaChange: MousePosition) {
    this.imageElement.image.scaledSize.width.value += deltaChange.x;
    this.imageElement.image.scaledSize.height.value += deltaChange.y;
  }

  private containWithinParentElement(): ADimension {
    const checkedDimensions = this._imageContainer;
    if (checkedDimensions.height.value < 0) {
      checkedDimensions.height.value = 0;
    }
    if (
      checkedDimensions.height.value >
      this.imageElement.parent.dimension.height.value
      ) {
        checkedDimensions.height.value = this.imageElement.parent.dimension.height.value;
      }
      if (checkedDimensions.width.value < 0) {
        checkedDimensions.width.value = 0;
      }
      if (
        checkedDimensions.width.value >
        this.imageElement.parent.dimension.width.value
        ) {
          checkedDimensions.width.value = this.imageElement.parent.dimension.width.value;
        }
    return checkedDimensions;
  }
}
