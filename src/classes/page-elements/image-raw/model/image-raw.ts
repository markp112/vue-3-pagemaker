import { ADimension } from '@/classes/base/dimension/a-dimension';

export interface ImageInterface  {
  naturalSize: ADimension /** @description natural size of imgage */;
  scaledSize: ADimension /** @description image size after user resizing */;
  ratio: number;
  maintainRatio: boolean;
  parentDimensions: ADimension;
}
