import { ImageBase } from '@/classes/images/image-manipulator/image-base';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';

function buildAnImage(name: string): ImageElement {
    return new PageElementBuilder()
    .setName(name)
    .buildAnImage();
}

describe('ImageBase', () => {
    let imageBase: ImageBase;
    const IMAGE_NAME = 'my image';
    

    beforeEach(() => {
        const imageElement: ImageElement =buildAnImage(IMAGE_NAME);
        imageBase = new ImageBase(imageElement)
    });

    it('should create class with the image element passed in', () => {
        expect(imageBase.imageElement).not.toBeNull();
        expect(imageBase.imageElement.name).toBe(IMAGE_NAME);
    })

    it('should have a default last mouse position set to 0', () => {
        expect(imageBase.lastMousePosition.x).toBe(0);
        expect(imageBase.lastMousePosition.y).toBe(0);
    })

    it('should allow a last mouse position to be set', () => {
        imageBase.lastMousePosition = {x: 100, y: 200};
        expect(imageBase.lastMousePosition.x).toEqual(100);
        expect(imageBase.lastMousePosition.y).toEqual(200);

    })
})