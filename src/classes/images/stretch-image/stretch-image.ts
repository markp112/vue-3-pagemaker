import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { StretchDirection } from "../types";
import { ImageBase } from "../image-manipulator/image-base";

export class StretchImage extends ImageBase {

    constructor(imageElement: ImageElement) {
        super(imageElement);
    }

    stretchImage(direction: StretchDirection): void {
        if (direction === 'horizontal') {
            this.imageElement.image.location.left.value = 0;
            this.imageElement.image.scaledSize.width = this.imageElement.container.naturalSize.width;
        } else {
            this.imageElement.image.location.top.value = 0;
            this.imageElement.image.scaledSize.height = this.imageElement.container.naturalSize.height;
        }
    }
}
