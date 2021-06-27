import { ButtonElement } from '@/classes/page-elements/button-element/button-element';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';
import { Style } from '@/classes/base/style/style';
import { ALocation } from '@/classes/base/location/a-location';

describe('ButtonElement', () => {

  it('should be built by pageElementBuilder with default properties', () => {
    const buttonElement = new PageElementBuilder()
      .setType('button')
      .buildAButton();

    expect(buttonElement).toBeDefined();
    expect(buttonElement.content).toBe('click me');
    expect(buttonElement.isContainer).toBe(false);
  })

  it('should build a button element with custom content',  () => {
    const content = 'submit'
    const buttonElement = new PageElementBuilder()
      .setType('button')
      .setContent(content)
      .buildAButton();

    expect(buttonElement).toBeDefined();
    expect(buttonElement.content).toBe(content);
  })

  it('should build a button element with custom dimensions',  () => {
    const height: ValueAndUnit = { value: 60, unit: 'px' };
    const width: ValueAndUnit = { value: 100, unit: 'px'};
    const dimension = new ADimension(height, width)
    const buttonElement = new PageElementBuilder()
      .setType('button')
      .setDimension(dimension)
      .buildAButton();

    expect(buttonElement).toBeDefined();
    expect(buttonElement.dimension.height).toEqual(height);
    expect(buttonElement.dimension.width).toEqual(width);
  })

  it('should have a default style set when setDefaultStyle is called', () => {
    const buttonElement = new PageElementBuilder()
    .setType('button')
    .buildAButton();
    buttonElement.setDefaultStyle();
    expect(buttonElement.styles.length).toBe(4);
  })

  it('should not set a default style if a style already exists, when setDefaultStyle is called', () => {
    const buttonElement = new PageElementBuilder()
    .setType('button')
    .buildAButton();
    const style: Style = {style: 'color', value: 'red' };
    buttonElement.styles.push(style);
    buttonElement.setDefaultStyle();
    expect(buttonElement.styles.length).toBe(1);
  })

  it('should return an object when getBaseElementContent is called with a property for each class eleemnt', () => {
    const height: ValueAndUnit = { value: 60, unit: 'px' };
    const width: ValueAndUnit = { value: 100, unit: 'px'};
    const dimension = new ADimension(height, width);
    const top: ValueAndUnit = { value: 10, unit: 'px'};
    const left: ValueAndUnit = { value: 5, unit: 'px'};
    const location: ALocation = new ALocation(top, left);
    const buttonElement = new PageElementBuilder()
    .setType('button')
    .setContent('label')
    .setDimension(dimension)
    .setLocation(location)
    .setName('button-1')
    .setParentRef('parent 1')
    .buildAButton();
    const buttonAsObject = buttonElement.getElementContent();
    expect(buttonAsObject.content).toEqual('label');
    expect(buttonAsObject.location.left.value).toEqual(left.value);
    expect(buttonAsObject.location.left.unit).toEqual(left.unit);
    expect(buttonAsObject.location.top.value).toEqual(top.value);
    expect(buttonAsObject.location.top.unit).toEqual(top.unit);
    expect(buttonAsObject.dimension.height.value).toEqual(height.value);
    expect(buttonAsObject.dimension.height.unit).toEqual(height.unit);
    expect(buttonAsObject.dimension.width.value).toEqual(width.value);
    expect(buttonAsObject.dimension.width.unit).toEqual(width.unit);
    expect(buttonAsObject.name).toEqual('button-1');
    expect(buttonAsObject.parentRef).toEqual('parent 1');
  })
})
