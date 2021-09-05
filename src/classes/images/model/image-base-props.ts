import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";

export interface ImageBaseProps {
  lastMousePosition: MousePosition;
  imageElement: ImageElement;
};
