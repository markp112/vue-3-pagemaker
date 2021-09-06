import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { MousePosition } from '@/classes/page-elements/types/mouse-position';
import { ImageBase } from '../image-manipulator/image-base';
import ImageManipulation, {ImageManipulationType} from '../model/image-manipulation';

export default class Pan extends ImageBase implements ImageManipulation {
  imageManipulationType: ImageManipulationType = 'pan';

  constructor(imageElement: ImageElement) {
    super(imageElement);
  }

  applyAction(currentMousePosition: MousePosition) {
    const deltaMouse: MousePosition = this.getDeltaChange(currentMousePosition);
    this.lastMousePosition = currentMousePosition;
    const location =  this.imageElement.image.location;
    const newLocation = this.calcNewPosition(deltaMouse, location);
    this.setLocation(this.imageElement.image.location, newLocation)
  }

}
