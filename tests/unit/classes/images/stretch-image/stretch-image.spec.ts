import { StretchImage } from "@/classes/images/stretch-image/stretch-image";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import buildAnImage from "../common/common";

describe('StretchImage', () => {

  let stretch: StretchImage;
  let imageElement: ImageElement | null;

  beforeEach(() => {
      imageElement = buildAnImage();
      stretch = new StretchImage(imageElement);
  });

  afterEach(() => {
      imageElement = null;
  })

  it('should when when called with a direction of horizontal, change the x dimension to match the container width', () => {
    if (imageElement) {
      const originalHeight = imageElement.image.scaledSize.height.value;
      stretch.stretchImage('horizontal');
      const scaledSize = imageElement.image.scaledSize;
      expect(scaledSize.width.value).toBe(imageElement.container.naturalSize.width.value);
      expect(scaledSize.height.value).toBe(originalHeight);
    }
  });

  it('should when when called with a direction of vertical, change the y dimension to match the container width', () => {
    if (imageElement) {
      const originalWidth = imageElement.image.scaledSize.width.value;
      stretch.stretchImage('vertical');
      const scaledSize = imageElement.image.scaledSize;
      expect(scaledSize.height.value).toBe(imageElement.container.naturalSize.height.value);
      expect(scaledSize.width.value).toBe(originalWidth);
    }
  });
})