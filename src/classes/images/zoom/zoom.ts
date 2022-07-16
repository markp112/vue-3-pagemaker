import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { ImageBase } from '../image-manipulator/image-base';
import { ZoomDirection } from '../types';
import { Point, calcDimensionChange, calcNewLocation } from './calcLocation';

export type SimpleDimension = { 
  width: number,
  height: number,
};

type Operators = '*' | '/' | '=';

export class Zoom extends ImageBase {

  constructor(imageElement: ImageElement) {
    super(imageElement)
  }

  private getScaledSize(): ADimension {
    const scaledSize = this.imageElement.image.scaledSize;
    return scaledSize.width.value === 0 && scaledSize.height.value === 0 
      ? this.imageElement.image.naturalSize 
      : scaledSize;
  }

  zoom(direction: ZoomDirection) {
    switch (direction) {
      case 'out':
      case 'in':
        this.handleZoomInOut(direction);
        break;
      case '100':
        this.handleZoomTo100Percent();
        break;
      case '50':
        this.handleZoomToHalf();
        break;
      case '48':
      case '32':
      case '24':
      case '16':
        this.handleSizeToIcon(direction);
        break;
      case 'zoomToFit':
        this.handleZoomToFit();
        break;
    }
  }

  private calcNewDimensions(dimension: ADimension, operator: Operators, scaler: number): SimpleDimension {
    const newDimensions: SimpleDimension = { width: 0, height: 0 };
    switch(operator) {
      case '*': 
        newDimensions.width = dimension.width.value * scaler;
        newDimensions.height = dimension.height.value * scaler;
        break;
      case '/':
        newDimensions.width = dimension.width.value / scaler;
        newDimensions.height = dimension.height.value / scaler;
        break;
      case '=':
        newDimensions.width = scaler;
        newDimensions.height = scaler;
        break;
    }
    return newDimensions;
  }

  private setDimensions(dimension: ADimension, newDimension: SimpleDimension) {
    dimension.height.value = newDimension.height;
    dimension.width.value = newDimension.width;
  }

  private handleZoomInOut(direction: ZoomDirection) {
    const SCALE = 1.1 as const;
    const scaledSize = this.getScaledSize();
    const operator: Operators = direction === 'in' ? '*' : '/';
    const newDimension = this.calcNewDimensions(scaledSize, operator, SCALE);
    const deltaChange: Point = calcDimensionChange(newDimension, this.imageElement.image.scaledSize);
    const newLocation: Point = calcNewLocation(this.imageElement.image.location, deltaChange);
    this.setLocation(this.imageElement.image.location, newLocation.y, newLocation.x);
    this.setDimensions(this.imageElement.image.scaledSize, newDimension);
  }

  private handleSizeToIcon(direction: ZoomDirection) {
    const size = parseInt(direction);
    const newDimension = this.calcNewDimensions(this.imageElement.image.scaledSize, '=', size);
    this.setDimensions(this.imageElement.image.scaledSize, newDimension);
    this.setLocation(this.imageElement.location, 0, 0);
  }

  private handleZoomToFit() {
      const newDimension = {
        width: this.imageElement.container.naturalSize.width.value,
        height: this.imageElement.container.naturalSize.height.value
      };
      this.setDimensions(this.imageElement.image.scaledSize, newDimension);
      this.setLocation(this.imageElement.image.location, 0, 0);
  }

  private handleZoomToHalf() {
    const newDimension = this.calcNewDimensions(this.imageElement.image.naturalSize, '/', 2);
    this.setDimensions(this.imageElement.image.scaledSize, newDimension);
    this.setLocation(this.imageElement.image.location, 
      this.imageElement.image.naturalSize.height.value / 2,
      this.imageElement.image.naturalSize.width.value / 2
    );
  }

  private handleZoomTo100Percent() {
    this.imageElement.scaledSize.width.value = this.imageElement.image.naturalSize.width.value;
    this.imageElement.scaledSize.height.value = this.imageElement.image.naturalSize.height.value;
    this.setLocation(this.imageElement.image.location, 0, 0);
  }

}
