import { CssStyleTypes, StyleTags } from '@/common/types/css-element-styles/css-element-styles';
import { Units } from '@/common/types/units';

export type Style =  {
  style: StyleTags | CssStyleTypes;
  value: string;
  unit?: Units;
};
