import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { ContainerProps, ImageProps } from '@/classes/page-elements/image-element/model/image-element-model';
import { ZoomDirection } from '../types';

export class Zoom {
  private _imageProps: ImageProps;
  private _containerProps: ContainerProps;
  private scaledDimensions: ADimension = new ADimension();

  constructor(
    imageProps: ImageProps,
    containerProps: ContainerProps
  ) {
    this._imageProps = imageProps;
    this._containerProps = containerProps;
  }

  setContainerProps(dimensionValue: number): void {
    this._containerProps.naturalSize.height.value = dimensionValue;
    this._containerProps.naturalSize.width.value = dimensionValue;
  }

  setImageProps(dimensionValue: number): void {
    this.scaledDimensions.height.value = dimensionValue;
    this.scaledDimensions.width.value = dimensionValue;
  }

  setLocation(location: number): void {
    this._imageProps.location.left.value = location;
        this._imageProps.location.top.value = location;
  }

  zoom(direction: ZoomDirection):
      { dimensions: ADimension; location: ALocation, containerDimensions: ADimension } {
    const SCALE = 1.1 as const;
    switch (direction) {
      case 'out':
        this.setImageProps(this._imageProps.scaledSize.height.value / SCALE);
        this.calcLocation();
        break;
      case 'in':
        this.setImageProps(this._imageProps.scaledSize.height.value * SCALE);
        this.calcLocation();
        break;
      case '100':
        this.setImageProps(this._imageProps.naturalSize.height.value);
        this.setLocation(-this.scaledDimensions.width / 2);
        break;
      case '50':
        this.setImageProps(this._imageProps.naturalSize.height.value / 2);
        this.setLocation(-this.scaledDimensions.width / 2);
        break;
      case '48':
        this.setImageProps(48);
        this.setContainerProps(48);
        this.setLocation(0);
        break;
      case '32':
        this.setImageProps(32);
        this.setContainerProps(32);
        this.setLocation(0);
        break;
      case '24':
        this.setImageProps(24);
        this.setContainerProps(24);
        this.setLocation(0);
        break;
      case '16':
        this.setImageProps(16);
        this.setContainerProps(16);
        this.setLocation(0);
        break;
      case 'zoomToFit':
        this.scaledDimensions.height.value = this._containerProps.naturalSize.height.value;
        this.scaledDimensions.width.value = this._containerProps.naturalSize.width.value;
        this.setLocation(0);
        break;
    }
    return {
      dimensions: this.scaledDimensions,
      location: this._imageProps.location,
      containerDimensions: this._containerProps.naturalSize,
    };
  }

  private calcLocation() {
    const deltaX = (this.scaledDimensions.width.value - this._imageProps.scaledSize.width.value) / 2;
    const deltaY = (this.scaledDimensions.height.value - this._imageProps.scaledSize.height.value) / 2;
    this._imageProps.location.left.value -= deltaX;
    this._imageProps.location.top.value -= deltaY;
  }
}
