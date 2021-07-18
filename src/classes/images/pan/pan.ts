import { ALocation } from '@/classes/base/location/a-location';
import { MousePosition } from '@/classes/page-elements/types/mouse-position';

type NewType = MousePosition;

export class Pan {
  pan(deltaMouse: NewType, location: ALocation): ALocation {
    const newLocation = new ALocation();
    newLocation.top.value = location.top.value + deltaMouse.y;
    newLocation.left.value = location.left.value + deltaMouse.x;
    newLocation.top.unit = location.top.unit;
    newLocation.left.unit = location.left.unit;
    return newLocation;
  }
}
