import { ADimension } from '@/classes/base/dimension/a-dimension';
import { Dimension } from '@/classes/base/dimension/model/dimension';
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

  setImageProps(dimensions: Dimension): void {
    this.scaledDimensions.height = dimensions.height;
    this.scaledDimensions.width = dimensions.width;
  }

  setLocation(location: number): void {
    this._imageProps.location.left.value = location;
        this._imageProps.location.top.value = location;
  }

  zoom(direction: ZoomDirection):
      { dimensions: ADimension,
        location: ALocation,
        containerDimensions: ADimension } {
    const SCALE = 1.1 as const;
    const dimensions: Dimension = {
      width: { value: 0, unit: 'px' },
      height: { value: 0, unit: 'px' },
    };
    console.log(this._imageProps, 'image props')
    switch (direction) {
      case 'out':
        dimensions.height.value = this._imageProps.scaledSize.height.value / SCALE;
        dimensions.width.value = this._imageProps.scaledSize.width.value / SCALE;
        this.setImageProps(dimensions);
        this.calcLocation();
        break;
      case 'in':
        dimensions.height.value = this._imageProps.scaledSize.height.value * SCALE;
        dimensions.width.value = this._imageProps.scaledSize.width.value * SCALE;
        this.setImageProps(dimensions);
        this.calcLocation();
        break;
      case '100':
        dimensions.width = this._imageProps.naturalSize.width;
        dimensions.height= this._imageProps.naturalSize.height;
        this.setImageProps(dimensions);
        this.setLocation(-this.scaledDimensions.width / 2);
        break;
      case '50':
        dimensions.height.value = this._imageProps.naturalSize.height.value / 2;
        dimensions.width.value = this._imageProps.naturalSize.width.value / 2;
        this.setImageProps(dimensions);
        this.setLocation(-this.scaledDimensions.width / 2);
        break;
      case '48':
        dimensions.height.value = 48;
        dimensions.width.value = 48;
        this.setImageProps(dimensions);
        this.setContainerProps(48);
        this.setLocation(0);
        break;
      case '32':
        dimensions.height.value = 32;
        dimensions.width.value = 32;
        this.setImageProps(dimensions);
        this.setContainerProps(32);
        this.setLocation(0);
        break;
      case '24':
        dimensions.height.value = 24;
        dimensions.width.value = 24;
        this.setImageProps(dimensions);
        this.setContainerProps(24);
        this.setLocation(0);
        break;
      case '16':
        dimensions.height.value = 16;
        dimensions.width.value = 16;
        this.setImageProps(dimensions);
        this.setContainerProps(16);
        this.setLocation(0);
        break;
      case 'zoomToFit':
        this.scaledDimensions.height.value = this._containerProps.naturalSize.height.value;
        this.scaledDimensions.width.value = this._containerProps.naturalSize.width.value;
        this.setLocation(0);
        break;
    }
    console.log('%c⧭', 'color: #807160', this.scaledDimensions);
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
