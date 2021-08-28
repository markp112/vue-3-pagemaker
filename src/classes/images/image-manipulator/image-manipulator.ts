import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import { Pan } from "../pan/pan";
import { ResizeImage } from "../resize/resize";
import { StretchDirection, ZoomDirection } from "../types";
import { Zoom } from "../zoom/zoom";
import { ImageBase } from "./image-base";

type Actions = 'zoom' | 'resize' | 'pan' | 'stretch';

export class ImageManipulator extends ImageBase {

    constructor(imageElement: ImageElement) {
        super(imageElement);
    }

    apply(action: Actions, mousePosition: MousePosition): void;
    apply(action: Actions, zoomOrStretch: ZoomDirection | StretchDirection): void;
    apply(action: Actions, param2: MousePosition | ZoomDirection | StretchDirection): void {
        switch(action) {
            case 'zoom':
                const zoom = new Zoom(this.imageElement);
                zoom.zoom(param2 as ZoomDirection); 
                break;
            case 'pan':
                const pan = new Pan(this.imageElement);
                pan.pan(param2 as MousePosition, this.imageElement.image.location);
                break;
            case 'stretch':
                break;
            case 'resize':
                const resize = new ResizeImage(this.imageElement);
                resize.resize(param2 as MousePosition);
        }
    }
} 