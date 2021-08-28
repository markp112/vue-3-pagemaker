import { ADimension } from "@/classes/base/dimension/a-dimension";
import { ALocation } from "@/classes/base/location/a-location";
import { Pan } from "@/classes/images/pan/pan";
import { PageElementBuilder } from "@/classes/page-elements/builder/page-element-builder";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import { ValueAndUnit } from "@/common/types/value_and_unit/value_and_unit";

const height: ValueAndUnit = { value: 768, unit: 'px' };
const width: ValueAndUnit = { value: 1024, unit: 'px' };
const location: ALocation = new ALocation({ value: 8, unit: 'px' }, { value: 10, unit: 'px' });

function buildAnImage(): ImageElement {
    return new PageElementBuilder()
        .setContent('dummy.png')
        .setNaturalSize(new ADimension(height, width))
        .setScaledSize(new ADimension())
        .setImageLocation(location)
        .buildAnImage();
}

describe('pan', () => {

    
    let pan: Pan;
    let imageElement: ImageElement;

    beforeEach(() => {
        imageElement = buildAnImage();
        pan = new Pan(imageElement);
    });

    it('should when pan is called with a positive mouse change the location should increase in value', () => {
        const mousePosition: MousePosition = {x: 1, y: 1};
        pan.pan(mousePosition, imageElement.image.location);
        expect(imageElement.image.location.top.value).toBe(9);
        expect(imageElement.image.location.left.value).toBe(11);
    });
    
    it('should when pan is called with a negative mouse change the location should decrease in value', () => {
        let mousePosition: MousePosition = {x: -1, y: 0};
        imageElement = buildAnImage();
        pan = new Pan(imageElement);
        pan.pan(mousePosition, imageElement.image.location);
        expect(imageElement.image.location.top.value).toBe(8);
        expect(imageElement.image.location.left.value).toBe(9);
    });
    
})