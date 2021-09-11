import  DragImage  from '@/classes/images/drag/drag'
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import buildAnImage from "../common/common";

describe('DragImage', () => {
  let dragImage: DragImage;
  let imageElement: ImageElement | null;

  beforeEach(() => {
      imageElement = buildAnImage();
      imageElement.container.location.left.value = 0;
      imageElement.container.location.top.value = 0;
      dragImage = new DragImage(imageElement);
  });

  afterEach(() => {
      imageElement = null;
  });

  it(`should move the image containers location left by the resulting change between the
  current mouse position and the previous mouse position`, () => {
    let currentMousePosition: MousePosition = { x: 1, y: 0 };
    expect(imageElement?.container.location.left.value).toBe(0);
    dragImage.applyAction(currentMousePosition);
    expect(imageElement?.container.location.left.value).toBe(1);
    currentMousePosition = { x: 0, y: 0 };
    dragImage.applyAction(currentMousePosition);
    expect(imageElement?.container.location.left.value).toBe(-1);
  });

  // note lastmouse position will be recorded as 0, 1 therefore
  // a -1 value for y results in a change of -2.
  it(`should move the image containers location top by n pixels 
  when the current mouse position moves by n pixels vertically`, () => {
    let currentMousePosition: MousePosition = { x: 0, y: 1 };
    expect(imageElement?.container.location.top.value).toBe(0);
    dragImage.applyAction(currentMousePosition);
    expect(imageElement?.container.location.top.value).toBe(1);
    currentMousePosition = { x: 0, y: -1 };
    dragImage.applyAction(currentMousePosition);
    expect(imageElement?.container.location.top.value).toBe(-1);
  });
});
