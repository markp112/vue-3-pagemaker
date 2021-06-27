import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { ComponentTypesString, SidebarElement } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import { PageElementBuilder } from '../builder/page-element-builder';
import { ButtonElement } from '../button-element/button-element';
import { ImageElement } from '../image-element/image-element';
import { PageContainer } from '../page-container/page-container';
import { TextElement } from '../text-element/text-element';

export type PageElementClasses =
  | ButtonElement
  | TextElement
  | ImageElement
  | PageContainer;

export const ROOT = 'ROOT';

/**
 * @description factory to build page elements as required e.g. button, text area etc
 * called with the component type required and the properties linked to that component
 */
export class PageElementFactory {

  public createElement(): PageElementClasses;

  public createElement(
    type: ComponentTypesString,
    ref: string
  ): PageElementClasses;

  public createElement(
    type: ComponentTypesString,
    ref: string,
    component: SidebarElement,
    parent: PageContainer | null
  ): PageElementClasses;

  public createElement(
    type?: ComponentTypesString,
    ref?: string,
    component?: SidebarElement,
    parent?: PageContainer | null
  ): PageElementClasses {
    if (type === "rootContainer" && ref) {
      return this.buildRootContainer(ref);
    }
    if (type && component && ref) {
      if (!parent) {
        return this.buildRootContainer(ref);
      } else {
        if (component.isContainer) {
          return this.createContainer(component, ref, parent);
        } else {
          return this.createComponent(component, ref, parent);
        }
      }
    }
    throw new Error('PageMaker::page-element-factory: PageElement type not recognised');
  }

  private createContainer(
    component: SidebarElement,
    ref: string,
    parent: PageContainer
  ): PageContainer {
    const container: PageContainer = new PageElementBuilder()
      .setRef(ref)
      .setIsContainer(true)
      .setName(component.componentName)
      .setParent(parent)
      .setType(component.type)
      .setComponentHtmlTag(component.componentRef)
      .setClassDefintion(component.classes)
      .setDimension(component.dimension)
      .setLocation(component.location)
      .buildAContainer();
    container.parentRef = container.parent.ref;
    return container;
  }

  private createComponent(
    component: SidebarElement,
    ref: string,
    parent: PageContainer
  ): PageElementClasses {
    const type = component.type;
    if (type === "button") {
      return this.buildAButton(component, ref, parent);
    }
    if (type === "text") {
      return this.buildATextElement(component, ref, parent);
    }
    if (type === "image") {
      return this.buildAnImageElement(component, ref, parent);
    }
    throw new Error("page-element-factory: PageElement type not recognised");
  }

  private buildAButton(
    component: SidebarElement,
    ref: string,
    parent: PageContainer
  ): ButtonElement {
    const buttonElement: ButtonElement = new PageElementBuilder()
      .setName(component.componentName)
      .setParent(parent)
      .setIsContainer(false)
      .setDimension(component.dimension)
      .setLocation(component.location)
      .setComponentHtmlTag(component.componentRef)
      .setClassDefintion(component.classes)
      .setRef(ref)
      .setType(component.type)
      .buildAButton();
    buttonElement.parentRef = buttonElement.parent.ref;
    return buttonElement;
  }

  private buildATextElement(
    component: SidebarElement,
    ref: string,
    parent: PageContainer
  ): TextElement {
    const textElement: TextElement = new PageElementBuilder()
      .setName(component.componentName)
      .setParent(parent)
      .setIsContainer(false)
      .setDimension(component.dimension)
      .setLocation(component.location)
      .setComponentHtmlTag(component.componentRef)
      .setClassDefintion(component.classes)
      .setRef(ref)
      .setType(component.type)
      .buildATextElement();
    textElement.parentRef = textElement.parent.ref;
    return textElement;
  }

  private buildAnImageElement(
    component: SidebarElement,
    ref: string,
    parent: PageContainer
  ): ImageElement {
    if (component.dimension.height.value > parent.dimension.height.value) {
      component.dimension.height.value = parent.dimension.height.value;
    }
    const imageElement: ImageElement = new PageElementBuilder()
      .setName(component.componentName)
      .setParent(parent)
      .setIsContainer(false)
      .setDimension(component.dimension)
      .setLocation(component.location)
      .setContainerDimensions(new ADimension({ value: 83, unit: 'px' }, { value: 100 , unit: 'px' }))
      .setContainerLocation(new ALocation())
      .setComponentHtmlTag(component.componentRef)
      .setClassDefintion(component.classes)
      .setRef(ref)
      .setType(component.type)
      .setNaturalSize(new ADimension({ value: 250, unit: 'px' }, { value: 300 , unit: 'px' }))
      .setScaledSize(new ADimension({ value: 83, unit: 'px' }, { value: 100 , unit: 'px' }))
      .setImageLocation(new ALocation())
      .buildAnImage();
    imageElement.parentRef = imageElement.parent.ref;
    return imageElement;
  }
  private getBuilder(): PageElementBuilder {
    return new PageElementBuilder()
  }

  private buildRootContainer(ref: string): PageContainer {
    const dimension = new ADimension({value: 1080, unit: 'px' }, { value: 1920, unit: 'px'});
    const container: PageContainer = this.getBuilder()
      .setName(ROOT)
      .setRef(ref)
      .setIsContainer(true)
      .setContainerDimensions(dimension)
      .buildAContainer();
    container.parentRef = container.ref;
    return container;
  }
}
