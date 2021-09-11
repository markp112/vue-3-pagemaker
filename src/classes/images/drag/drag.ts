import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import { ImageBase } from "../image-manipulator/image-base";
import ImageManipulation, { ImageManipulationType } from "../model/image-manipulation";

export default class DragImage extends ImageBase implements ImageManipulation {

  imageManipulationType: ImageManipulationType = 'drag';

  constructor(imageElement: ImageElement) {
    super(imageElement);
  }
  
  applyAction(currentMousePosition: MousePosition): void {
    const deltaMouse: MousePosition = this.getDeltaChange(currentMousePosition);
    this.lastMousePosition = currentMousePosition;
    const location = this.imageElement.container.location;
    const newLocation = this.calcNewPosition(deltaMouse, location);
    this.setLocation(this.imageElement.container.location, newLocation);
  }

}