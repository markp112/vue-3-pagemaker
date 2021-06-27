import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import { ButtonElement } from '@/classes/page-elements/button-element/button-element';
import { PageElementFactory } from '@/classes/page-elements/factory/page-elements-factory';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { PageContainer } from '@/classes/page-elements/page-container/page-container';
import { TextElement } from '@/classes/page-elements/text-element/text-element';

describe('PageElementBuilder', () => {


  it('should return a  root componentElement when buildAcomponent is called with type of rootcomponent', () => {
    const component: PageContainer = new PageElementBuilder()
    .setType('rootContainer')
    .setParentRef('ROOT')
    .setName('Root')
    .setRef('ROOT')
    .buildAContainer();
    expect(component).toBeDefined;
    expect(component.isContainer).toBe(true);
    expect(component.elements.length).toBe(0);
  });

  it('should return a componentElement when buildAcomponent is called with type of component', () => {
    const component: PageContainer = new PageElementBuilder()
    .setType('container')
    .setName('component-1')
    .setRef('root')
    .buildAContainer();
    expect(component).toBeDefined;
    expect(component.isContainer).toBe(true);
    expect(component.elements.length).toBe(0);
    expect(component.name).toEqual('component-1');
  });

  it('should return an ImageElement when buildAnImage is called', () => {
    const componentName = 'image-1';
    const component: ImageElement = new PageElementBuilder()
    .setType('image')
    .setName(componentName)
    .setParentRef('rootContainer')
    .setRef('image-1')
    .buildAnImage();
    expect(component).toBeDefined;
    expect(component.isContainer).toBe(false);
    expect(component.name).toEqual(componentName);
    expect(component.location).toBeDefined();
    expect(component.dimension).toBeDefined();
    expect(component.naturalSize).toBeDefined();
    expect(component.scaledSize).toBeDefined();
    expect(component.container).toBeDefined();
    expect(component.content).toEqual('https://firebasestorage.googleapis.com/v0/b/page-maker-69fb1.appspot.com/o/assets%2Fimages%2Fimageplaceholder.png?alt=media&token=149d3e60-0fc4-49de-9e23-5fea91458240');
  });

  it('should return a buttonElement when buildAButton is called', () => {
    const componentName = 'button-1';
    const component: ButtonElement = new PageElementBuilder()
    .setType('button')
    .setName(componentName)
    .setParentRef('rootContainer')
    .setRef('button-1')
    .buildAButton();
    expect(component).toBeDefined;
    expect(component.isContainer).toBe(false);
    expect(component.name).toEqual(componentName);
    expect(component.location).toBeDefined();
    expect(component.dimension).toBeDefined();
    expect(component.content).toEqual('click me');
  });

  it('should return a textElement when buildATextElement is called', () => {
    const componentName = 'text-1';
    const component: TextElement = new PageElementBuilder()
    .setType('button')
    .setName(componentName)
    .setParentRef('rootContainer')
    .setRef('text-1')
    .buildATextElement();
    expect(component).toBeDefined;
    expect(component.isContainer).toBe(false);
    expect(component.name).toEqual(componentName);
    expect(component.location).toBeDefined();
    expect(component.dimension).toBeDefined();
    expect(component.content).toContain('Lorem ipsum');
  });



})
