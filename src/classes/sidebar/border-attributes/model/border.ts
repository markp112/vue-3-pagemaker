import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';
import { BorderDirections, BorderStyle } from '../types/border-types';

export interface BorderInterface {
  borderDirection: BorderDirections;
  colour: string;
  style: BorderStyle;
  width: ValueAndUnit;
  borderRadius: ValueAndUnit;
}
