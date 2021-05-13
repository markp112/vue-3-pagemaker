import { Units } from '@/common/types/units';
import { Dimension } from './model/dimension';

export class ADimension implements Dimension {
  _height;
  _width;
  _units: Units;

  constructor();
  constructor(height: number, width: number);
  constructor(height: number, width: number, units: Units);
  constructor(height?: number, width?: number, units?: Units) {
    this._height = height ? height : 0;
    this._width = width ? width : 0;
    this._units = units ? units : 'px';
  }

  get height(): number {
    return this._height;
  }

  set height(height: number) {
    this._height = height;
  }

  get width(): number {
    return this._width;
  }

  set width(width: number) {
    this._width = width;
  }

  set units(units: Units) {
    this._units = units;
  }

  get units(): Units {
    return this._units;
  }

  toStyle(): string {
    const height = `height:${this._height}${this._units};`
    const width = `width:${this._width}${this._units};`;
    return `${height}${width}`;
  }

  toObject(): Dimension {
    return {
      width: this._width,
      height: this._height,
      units: this._units,
    };
  }
}
