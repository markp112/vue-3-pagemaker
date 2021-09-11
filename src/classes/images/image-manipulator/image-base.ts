import { ALocation } from "@/classes/base/location/a-location";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
// import { ImageBaseProps } from '../model/image-base-props';

export interface MousePosition {
    x: number;
    y: number;
}

export class ImageBase  {
   private _lastMousePosition: MousePosition = {
        x: 0,
        y: 0,
    };

    private _imageElement: ImageElement;

    constructor(imageElement: ImageElement) {
        this._imageElement = imageElement;
    }

    get lastMousePosition(): MousePosition {
        return this._lastMousePosition;
    }

    set lastMousePosition(mousePosition: MousePosition) {
        this._lastMousePosition = mousePosition;
    }

    get imageElement(): ImageElement {
        return this._imageElement;
    }

    protected setLocation(location: ALocation, newLocation: ALocation): void
    protected setLocation(location: ALocation, top: number, left: number): void
    protected setLocation(location: ALocation, param2: ALocation | number, param3?: number): void {
        if (typeof param2 === 'object') {
            location.left.value = param2.left.value;
            location.top.value = param2.top.value;
        } else {
            location.top.value = param2;
            if (typeof param3 === 'number' ) {
                location.left.value = param3;
                location.top.value = param2;
            }
        }
    }

    protected getDeltaChange(currentMousePosition: MousePosition): MousePosition {
        const newPosition: MousePosition = {
            x: currentMousePosition.x - this.lastMousePosition.x,
            y: currentMousePosition.y - this.lastMousePosition.y
        };
        return newPosition;
    }

    protected calcNewPosition(deltaMouse: MousePosition, location: ALocation): ALocation {
        const newLocation = new ALocation();
        newLocation.top.value = location.top.value + deltaMouse.y;
        newLocation.left.value = location.left.value + deltaMouse.x;
        newLocation.top.unit = location.top.unit;
        newLocation.left.unit = location.left.unit;
        return newLocation;
    }
}