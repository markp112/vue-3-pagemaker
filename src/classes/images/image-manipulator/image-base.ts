import { ALocation } from "@/classes/base/location/a-location";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";

export interface MousePosition {
  x: number;
  y: number;
}


export class ImageBase {
    #lastMousePosition: MousePosition = {
        x: 0,
        y: 0,
    };

    #imageElement: ImageElement;

    constructor(imageElement: ImageElement) {
        this.#imageElement = imageElement;
    }

    get lastMousePosition(): MousePosition {
        return this.#lastMousePosition;
    }

    set lastMousePosition(mousePosition: MousePosition) {
        this.#lastMousePosition = mousePosition;
    }

    get imageElement(): ImageElement {
        return this.#imageElement;
    }

    protected setLocation(location: ALocation, newLocation: ALocation): void
    protected setLocation(location: ALocation, top: number, left: number): void
    protected setLocation(location: ALocation, param2: ALocation | number, param3?: number): void {
        if (typeof param2 === 'object') {
            location.left.value = param2.left.value;
            location.top.value = param2.top.value;
        } else {
            location.top.value = param2;
            console.log('%c⧭', 'color: #e57373', param3);
            if (typeof param3 ==='number' ) {
                location.left.value = param3;
                console.log('%c⧭', 'color: #997326', location.left.value);

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
}