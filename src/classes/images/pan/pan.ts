import { ALocation } from '@/classes/base/location/a-location';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { MousePosition } from '@/classes/page-elements/types/mouse-position';
import { ImageBase } from '../image-manipulator/image-base';

export class Pan extends ImageBase {

  constructor(imageElement: ImageElement) {``
    super(imageElement);
  }

  pan(deltaMouse: MousePosition, location: ALocation) {
    const newLocation = this.calcNewPosition(deltaMouse, location);
    this.setLocation(this.imageElement.image.location, newLocation)
  }

  private calcNewPosition(deltaMouse: MousePosition, location: ALocation): ALocation {
    const newLocation = new ALocation();
    newLocation.top.value = location.top.value + deltaMouse.y;
    newLocation.left.value = location.left.value + deltaMouse.x;
    newLocation.top.unit = location.top.unit;
    newLocation.left.unit = location.left.unit;
    return newLocation;
  }
}
