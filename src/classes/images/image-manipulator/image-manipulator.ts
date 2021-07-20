import { Zoom } from '../zoom/zoom';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { MousePosition } from '@/classes/page-elements/types/mouse-position';
import { StretchDirection, ZoomDirection } from '../types';
import { ResizeImage } from '../resize/resize';
import { Pan } from '../pan/pan';

export interface MousePostion {
  x: number;
  y: number;
}

export class ImageManipulator {
  private _lastMousePosition: MousePostion = {
    x: 0,
    y: 0
  };
  private _imageElement: ImageElement;

  constructor(imageElement: ImageElement) {
    this._imageElement = imageElement;
  }

  set lastMousePosition(mousePosition: MousePostion) {
    this._lastMousePosition = { ...mousePosition };
  }

  get imageElement(): ImageElement {
    return this._imageElement;
  }

  public applyAction(action: ZoomDirection | StretchDirection): void {
    if (action === 'vertical' || action === 'horizontal') {
      this.stretch(action);
    } else {
      this.zoom(action);
    }
  }

  public resize(currentMousePosition: MousePostion) {
    const deltaChange: MousePosition = this.getDeltaChange(currentMousePosition);
    this.lastMousePosition = { ...currentMousePosition };
    const resizeImage = new ResizeImage(this._imageElement);
    resizeImage.resize(deltaChange);
  }

  public zoom(direction: ZoomDirection): void {
    const zoom: Zoom = new Zoom(
      this._imageElement.image,
      this._imageElement.container
      );
    const dimensionLocation = zoom.zoom(direction);
    this._imageElement.image.scaledSize = dimensionLocation.dimensions;
    this._imageElement.image.location = dimensionLocation.location ;
  }

  public stretch(direction: 'horizontal' | 'vertical'): void {
    if (direction === 'horizontal') {
      this._imageElement.image.location.left.value = 0;
      this._imageElement.image.scaledSize.width = this.imageElement.containerDimensions.width;
    } else {
      this._imageElement.image.location.top.value = 0;
      this._imageElement.image.scaledSize.height = this.imageElement.containerDimensions.height;
    }
  }

  public pan(currentMousePosition: MousePosition) {
    const deltaMouse: MousePosition = this.getDeltaChange(currentMousePosition);
    this._lastMousePosition = currentMousePosition;
    const pan = new Pan();
    this._imageElement.image.location = pan.pan(
      deltaMouse,
      this._imageElement.image.location
    );
  }

  private getDeltaChange(currentMousePosition: MousePostion): MousePosition {
    const newPosition: MousePosition = {
      x: currentMousePosition.x - this._lastMousePosition.x,
      y: currentMousePosition.y - this._lastMousePosition.y
    };
    return newPosition;
  }
}
