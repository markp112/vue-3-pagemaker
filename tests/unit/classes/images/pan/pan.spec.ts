import Pan from "@/classes/images/pan/pan";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import buildAnImage from "../common/common";

describe('pan', () => {
    
    let pan: Pan;
    let imageElement: ImageElement | null;

    beforeEach(() => {
        imageElement = buildAnImage();
        pan = new Pan(imageElement);
    });

    afterEach(() => {
        imageElement = null;
    })

    it('should when pan is called with a positive mouse change the location should increase in value', () => {
        const mousePosition: MousePosition = {x: 1, y: 1};
        if (imageElement) {
            pan.pan(mousePosition);
            expect(imageElement.image.location.top.value).toBe(9);
            expect(imageElement.image.location.left.value).toBe(11);
        }
    });
    
    it('should when pan is called with a negative mouse change the location should decrease in value', () => {
        const mousePosition: MousePosition = {x: -1, y: 0};
        if (imageElement) {
            pan.pan(mousePosition);
            expect(imageElement.image.location.top.value).toBe(8);
            expect(imageElement.image.location.left.value).toBe(9);
        };
    });
    
})