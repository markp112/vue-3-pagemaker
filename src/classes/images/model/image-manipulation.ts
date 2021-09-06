import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import { ImageBase } from "../image-manipulator/image-base";

export type ImageManipulationType = 'pan' | 'drag' | 'resize';

export default interface ImageManipulation extends ImageBase {

  imageManipulationType: ImageManipulationType;

  applyAction(currentMousePosition: MousePosition): void;
} 