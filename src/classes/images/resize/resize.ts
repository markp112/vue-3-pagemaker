import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { ImageBase } from '../image-manipulator/image-base';
import { MousePosition } from '../image-manipulator/image-base';
import ImageManipulation, { ImageManipulationType } from '../model/image-manipulation';

export class ResizeImage  extends ImageBase implements ImageManipulation {
  imageManipulationType: ImageManipulationType = 'resize';

  constructor(imageElement: ImageElement) {
    super(imageElement)
  }

  applyAction(currentMousePosition: MousePosition) {
    const deltaMouse: MousePosition = this.getDeltaChange(currentMousePosition);
    this.lastMousePosition = { ...currentMousePosition };
    const checkedChange = this.containWithinParentElement(deltaMouse);
    this.setNewSizes(checkedChange);
  }

  private setNewSizes(deltaChange: MousePosition) {
    this.imageElement.image.scaledSize.width.value += deltaChange.x;
    this.imageElement.image.scaledSize.height.value += deltaChange.y;
    this.imageElement.container.naturalSize.height.value += deltaChange.y;
    this.imageElement.container.naturalSize.width.value += deltaChange.x;
    
  }

  private containWithinParentElement(deltaChange: MousePosition): MousePosition {
    const adjustedChange: MousePosition = deltaChange;
    const height = this.imageElement.container.naturalSize.height.value + deltaChange.y;
    const width = this.imageElement.container.naturalSize.width.value + deltaChange.x;
    if (height < 0) {
      adjustedChange.y = 0;
    }
    if (height > this.imageElement.parent.dimension.height.value) {
        adjustedChange.y = 0;
    }
    if (width < 0) {
      adjustedChange.x = 0;
    }
    if (width > this.imageElement.parent.dimension.width.value) {
        adjustedChange.x = 0;
      }
    return adjustedChange;
  }
}
