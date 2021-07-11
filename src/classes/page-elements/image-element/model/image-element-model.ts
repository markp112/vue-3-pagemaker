import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { PageElementInterface } from '../../page-element-base/model/page-element';

export type ContainerProps = {
  location: ALocation;
  naturalSize: ADimension;
};

export type ImageProps = ContainerProps & {
  scaledSize: ADimension;
};

export interface ImageElementInterface extends PageElementInterface {
  ratio: number;
  maintainRatio: boolean;
  container: ContainerProps;
  image: ImageProps;
  toString(): string
}
