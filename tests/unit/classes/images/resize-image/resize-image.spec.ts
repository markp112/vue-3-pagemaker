import { ResizeImage } from "@/classes/images/resize/resize";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import buildAnImage from "../common/common";

describe('ResizeImage', () => {
  let resizeImage: ResizeImage;
  let imageElement: ImageElement | null;

  beforeEach(() => {
      imageElement = buildAnImage();
      imageElement.image.scaledSize.width.value = 300;
      imageElement.image.scaledSize.height.value = 200;
      resizeImage = new ResizeImage(imageElement);
  });

  afterEach(() => {
      imageElement = null;
  })

  it(`should when the mouse is moved in the +ve x direction,
    increase the width of the image by the change between the mouse position now and the last position`, () => {
    expect(imageElement?.image.scaledSize.width.value).toBe(300);
    let currentMousePosition: MousePosition = { x: 1, y: 0 };
    resizeImage.applyAction(currentMousePosition);
    expect(imageElement?.image.scaledSize.width.value).toBe(301);
  });
  
  it(`should when the mouse is moved in the -ve x direction,
    increase the width of the image by the change between the mouse position now and the last position`, () => {
    expect(imageElement?.image.scaledSize.width.value).toBe(300);
    let currentMousePosition: MousePosition = { x: -1, y: 0 };
    resizeImage.applyAction(currentMousePosition);
    expect(imageElement?.image.scaledSize.width.value).toBe(299);
  });

  it(`should when the mouse is moved in the +ve y direction,
    increase the width of the image by the change between the mouse position now and the last position`, () => {
    if (imageElement) {
      expect(imageElement?.image.scaledSize.height.value).toBe(200);
      imageElement.container.naturalSize.height.value = 200;
      let currentMousePosition: MousePosition = { x: 0, y: 1 };
      resizeImage.applyAction(currentMousePosition);
      expect(imageElement?.image.scaledSize.height.value).toBe(201);
    }
  });
  
  it(`should when the mouse is moved in the -ve y direction,
    decrease the width of the image by the change between the mouse position now and the last position`, () => {
    if (imageElement) {
      expect(imageElement?.image.scaledSize.height.value).toBe(200);
      imageElement.container.naturalSize.height.value = 200;
      let currentMousePosition: MousePosition = { x: 0, y: -1 };
      resizeImage.applyAction(currentMousePosition);
      expect(imageElement?.image.scaledSize.height.value).toBe(199);
    }
  });

  it(`should not increase the size of the image outside of dimensions of the parent container`, () => {
    if (imageElement) {
      imageElement.parent.dimension.height.value = 299;
      imageElement.parent.dimension.width.value = 199;
      let currentMousePosition: MousePosition = { x: 1, y: 1 };
      expect(imageElement.image.scaledSize.height.value).toBe(200);
      expect(imageElement.image.scaledSize.width.value).toBe(300);
      resizeImage.applyAction(currentMousePosition);
      expect(imageElement.image.scaledSize.height.value).toBe(200);
      expect(imageElement.image.scaledSize.width.value).toBe(300);
      expect(imageElement.container.naturalSize.width.value).toBe(800);
      expect(imageElement.container.naturalSize.height.value).toBe(1240);
    }
  })

})