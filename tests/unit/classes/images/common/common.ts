import { ADimension } from "@/classes/base/dimension/a-dimension";
import { ALocation } from "@/classes/base/location/a-location";
import { PageElementBuilder } from "@/classes/page-elements/builder/page-element-builder";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { ValueAndUnit } from "@/common/types/value_and_unit/value_and_unit";

export const height: ValueAndUnit = { value: 768, unit: 'px' };
export const width: ValueAndUnit = { value: 1024, unit: 'px' };

export default function buildAnImage(): ImageElement {
  const location: ALocation = new ALocation({ value: 8, unit: 'px' }, { value: 10, unit: 'px' });
  const containerDimension = new ADimension({ value: 1240, unit: 'px'}, { value: 800, unit: 'px'})
  return new PageElementBuilder()
    .setContent('dummy.png')
    .setNaturalSize(new ADimension(height, width))
    .setScaledSize(new ADimension())
    .setImageLocation(location)
    .setContainerDimensions(containerDimension)
    .buildAnImage();
}
