import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import Pan from "../pan/pan";
import { ResizeImage } from "../resize/resize";
import { StretchDirection, ZoomDirection } from "../types";
import { Zoom } from "../zoom/zoom";
import { ImageBase } from "./image-base";
import { StretchImage } from "./stretch-image/stretch-image";

type Actions = 'zoom' | 'resize' | 'pan' | 'stretch';

export class ImageManipulator {
    
    private _action: Pan | Zoom | StretchImage | ResizeImage;

    constructor(action: Pan | Zoom | StretchImage | ResizeImage) {
        this._action = action;
    }

    apply(action: Actions, mousePosition: MousePosition): void;
    apply(action: Actions, zoomOrStretch: ZoomDirection | StretchDirection): void;
    apply(action: Actions, param2: MousePosition | ZoomDirection | StretchDirection): void {
        switch(action) {
            case 'zoom':
                const zoom = this._action as Zoom;
                zoom.zoom(param2 as ZoomDirection); 
                break;
            case 'pan':
                console.log('%c%s', 'color: #1d5673', 'pan');
                const pan = this._action as Pan;
                pan.pan(param2 as MousePosition);
                break;
            case 'resize':
                const resize = this._action as ResizeImage;
                resize.resize(param2 as MousePosition);
                break;
            case 'stretch':
                const stretch = this._action as StretchImage;
                stretch.stretchImage(param2 as StretchDirection);
                break;
        }
    }
} 