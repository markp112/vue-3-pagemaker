import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';
import { Location } from './model/location';

const EMPTY_VALUE: ValueAndUnit = {value: 0, unit: 'px'};

export class ALocation implements Location {
  private _top: ValueAndUnit;
  private _left: ValueAndUnit;

  constructor();
  constructor(top: ValueAndUnit, left: ValueAndUnit);
  constructor(top?: ValueAndUnit, left?: ValueAndUnit,) {
    this._top = top ? top : EMPTY_VALUE;
    this._left = left? left: EMPTY_VALUE;
  }

  get top(): ValueAndUnit {
    return this._top;
  }

  set top(top: ValueAndUnit) {
    this._top = top;
  }

  get left(): ValueAndUnit {
    return this._left;
  }

  set left(left: ValueAndUnit) {
    this._left = left;
  }

  toStyle(): string {
    const left = `left:${this.left.value}${this.left.unit};`;
    const top = `top:${this._top.value}${this.top.unit};`;
    return `${left}${top}`
  }

  toObject(): Location {
    return {
      top: this._top,
      left: this._left,
    };
  }

}
