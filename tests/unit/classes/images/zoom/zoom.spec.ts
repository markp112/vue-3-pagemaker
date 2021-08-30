import { ADimension } from "@/classes/base/dimension/a-dimension"
import { Zoom } from "@/classes/images/zoom/zoom";
import { ImageElement } from "@/classes/page-elements/image-element/image-element"
import buildAnImage, { height, width } from "../common/common";


describe('Zoom', () => {
    
    let imageElement: ImageElement;
    let zoom: Zoom;

    beforeEach(() => {
        imageElement = buildAnImage();
        zoom = new Zoom(imageElement);
    });

    it('should when created have an image a natural size of 1024 x 768', () => {
        expect(imageElement.image.naturalSize.width.value).toEqual(1024);
        expect(imageElement.image.naturalSize.height.value).toEqual(768);
    });

    it('should when created have a scaled size of 0 if no scaled szie is provided', () => {
        expect(imageElement.image.scaledSize.width.value).toBe(0);
        expect(imageElement.image.scaledSize.height.value).toBe(0);
    });

    it('should when zoom is called with 100, set the image scaled size to the natural size', () => {
        zoom.zoom('100');
        expect(imageElement.image.scaledSize).toEqual(imageElement.naturalSize);
        expect(imageElement.image.location.top.value).toEqual(0)
        expect(imageElement.image.location.left.value).toEqual(0)
    });

    it('should when zoom is called with 50, set the image scaled size to be half the natural size', () => {
        zoom.zoom('50');
        expect(imageElement.image.scaledSize.height.value).toEqual(imageElement.naturalSize.height.value / 2);
        expect(imageElement.image.scaledSize.width.value).toEqual(imageElement.naturalSize.width.value / 2);
        expect(imageElement.image.location.top.value).toEqual(imageElement.naturalSize.height.value / 2)
        expect(imageElement.image.location.left.value).toEqual(imageElement.naturalSize.width.value / 2)
    });
    
    it('should when zoom is called with out, reduce the size of the scaled image dimension by a ratio of 1.1', () => {
        const scaler = 1.1;
        zoom.zoom('out');
        let existingDimensions = new ADimension(imageElement.image.naturalSize.height, imageElement.image.naturalSize.width)
        expect(imageElement.image.scaledSize.height.value).toBe(existingDimensions.height.value / scaler);
        expect(imageElement.image.scaledSize.width.value).toBe(existingDimensions.width.value / scaler);
        existingDimensions = new ADimension(imageElement.image.scaledSize.height, imageElement.image.scaledSize.width)
        zoom.zoom('out');
        expect(imageElement.image.scaledSize.height.value).toBe(existingDimensions.height.value / scaler);
        expect(imageElement.image.scaledSize.width.value).toBe(existingDimensions.width.value / scaler);
    });

    it('should when zoom is called with in, increase the size of the image by the Scale of 1.1', () => {
        zoom.zoom('in');
        const scaler = 1.1;
        let existingDimensions = new ADimension(imageElement.image.naturalSize.height, imageElement.image.naturalSize.width)
        expect(imageElement.image.scaledSize.height.value).toBe(existingDimensions.height.value * scaler);
        expect(imageElement.image.scaledSize.width.value).toBe(existingDimensions.width.value * scaler);
        existingDimensions = new ADimension(imageElement.image.scaledSize.height, imageElement.image.scaledSize.width)
        zoom.zoom('in');
        expect(imageElement.image.scaledSize.height.value).toBe(existingDimensions.height.value * scaler);
        expect(imageElement.image.scaledSize.width.value).toBe(existingDimensions.width.value * scaler);
    });

    it('should when zoom is called with zoom to fit, it should size the image to match the size of its container', () => {
        imageElement.container.naturalSize = new ADimension (height, width);
        expect(imageElement.image.scaledSize.height.value).toBe(0);
        expect(imageElement.image.scaledSize.width.value).toBe(0);
        zoom.zoom('zoomToFit');
        expect(imageElement.image.scaledSize.height).toEqual(height);
        expect(imageElement.image.scaledSize.width).toEqual(width);
    });

    it('should when zoom is called with one of the values 16, 24, 32, 48, size the image dimensions to equal the value', () => {
        zoom.zoom('16');
        expect(imageElement.image.scaledSize.height.value).toBe(16);
        expect(imageElement.image.scaledSize.width.value).toBe(16);
        zoom.zoom('24');
        expect(imageElement.image.scaledSize.height.value).toBe(24);
        expect(imageElement.image.scaledSize.width.value).toBe(24);
        zoom.zoom('32');
        expect(imageElement.image.scaledSize.height.value).toBe(32);
        expect(imageElement.image.scaledSize.width.value).toBe(32);
        zoom.zoom('48');
        expect(imageElement.image.scaledSize.height.value).toBe(48);
        expect(imageElement.image.scaledSize.width.value).toBe(48);
    })
})