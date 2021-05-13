import { Units } from '@/common/types/units';

/**
 * @description used for storing the location of a component on the page
 */
 export interface Location {
  top: number;
  left: number;
  units: Units;
}
