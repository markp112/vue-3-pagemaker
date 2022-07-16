import { ALocation } from '@/classes/base/location/a-location';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { AnActionEvent } from '@/classes/base/action/an-action';
import { Style } from '@/classes/base/style/style';
import { PageContainer } from '../page-container/page-container';
import { ComponentTypesString } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import { PageElement } from '../page-element-base/page-element-base';
import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';
import { LOREMIPSUM } from '../data/defaults';
import { ButtonElement } from '../button-element/button-element';
import { TextElement } from '../text-element/text-element';
import {
  ContainerProps,
  ImageProps
} from '../image-element/model/image-element-model';
import { ImageElement } from '../image-element/image-element';
import defaultSettings from '@/common/defaults/defaults';

export class PageElementBuilder {
  private _name = ''; //name of the component
  private _ref = ''; // unique ref of this component in the Dom
  private _componentHTMLTag = ''; // component tag
  private _isContainer = false; // can contain  other elements
  private _styles: Style[] = []; // css styles
  private _parent!: PageContainer; // parent Object
  private _parentRef = ''; // string ref to the parent
  private _classDefinition = '';
  private _type: ComponentTypesString = undefined; // what is this component as in image text etc
  private _location: ALocation = new ALocation();
  private _dimension: ADimension = new ADimension();
  private _actionEvent: AnActionEvent = new AnActionEvent('Navigation', '');
  private _content = '';
  private _isAbsolute = false;
  private _image: ImageProps = {
    location: new ALocation(),
    naturalSize: new ADimension(),
    scaledSize: new ADimension(),
  };
  private _container: ContainerProps = {
    location: new ALocation(),
    naturalSize: new ADimension(),
  };

  setName(name: string) {
    this._name = name;
    return this;
  }

  setRef(ref: string) {
    this._ref = ref;
    return this;
  }

  setComponentHtmlTag(htmlTag: string): PageElementBuilder {
    this._componentHTMLTag = htmlTag;
    return this;
  }

  setIsContainer(isContainer: boolean): PageElementBuilder {
    this._isContainer = isContainer;
    return this;
  }

  setStyles(styles: Style[]): PageElementBuilder {
    this._styles = styles;
    return this;
  }

  setParent(parent: PageContainer): PageElementBuilder {
    this._parent = parent;
    return this;
  }

  setParentRef(parentRef: string): PageElementBuilder {
    this._parentRef = parentRef;
    return this;
  }

  setClassDefintion(classDefintion: string): PageElementBuilder {
    this._classDefinition = classDefintion;
    return this;
  }

  setType(type: ComponentTypesString): PageElementBuilder {
    this._type = type;
    return this;
  }

  setLocation(location: ALocation): PageElementBuilder {
    this._location = location;
    return this;
  }

  setDimension(dimension: ADimension): PageElementBuilder {
    this._dimension = dimension;
    return this;
  }

  setActionEvent(actionEvent: AnActionEvent): PageElementBuilder {
    this._actionEvent = actionEvent;
    return this;
  }

  setContent(content: string) {
    this._content = content;
    return this;
  }

  setNaturalSize(naturalSize: ADimension) {
    this._image.naturalSize = naturalSize;
    return this;
  }

  setScaledSize(scaledSize: ADimension) {
    this._image.scaledSize = scaledSize
    return this;
  }

  setImageLocation(location: ALocation) {
    this._image.location = location;
    return this;
  }

  setContainerDimensions(dimension: ADimension) {
    this._container.naturalSize = dimension;
    return this;
  }

  setContainerLocation(location: ALocation) {
    this._container.location = location;
    return this;
  }

  setIsAbsolute(isAbsolute: boolean) {
    this._isAbsolute = isAbsolute;
    return this;
  }

  public get name(): string {
    return this._name;
  }

  public get ref(): string {
    return this._ref;
  }

  public get componentHTMLTag(): string {
    return this._componentHTMLTag;
  }

  public get isContainer() {
    return this._isContainer;
  }

  public get styles(): Style[] {
    return this._styles;
  }

  public get parent(): PageContainer {
    return this._parent;
  }

  public get parentRef(): string {
    return this._parentRef;
  }

  public get classDefinition() {
    return this._classDefinition;
  }

  public get type(): ComponentTypesString {
    return this._type;
  }

  public get location(): ALocation {
    return this._location;
  }

  public get dimension(): ADimension {
    return this._dimension;
  }


  public get actionEvent(): AnActionEvent {
    return this._actionEvent;
  }

  public get content(): string {
    return this._content;
  }

  public get naturalSize(): ADimension {
    return this._image.naturalSize;
  }

  public get scaledSize(): ADimension {
    return this._image.scaledSize;
  }

  public get imageLocation(): ALocation {
    return this._image.location;
  }

  public get containerDimensions(): ADimension {
    return this._container.naturalSize;
  }

  public get containerLocation(): ALocation {
    return this._container.location;
  }

  public get isAbsolute(): boolean {
    return this._isAbsolute;
  }

  // required to create an empty container / element when initialising props.
  public build(): PageElement {
    return new PageElement(this);
  }

  public buildAButton(): ButtonElement {
    if (this._content === '') {
      this._content = 'click me';
    }
    return new ButtonElement(this);
  }

  public buildATextElement(): TextElement {
    if (this._content === '') {
      this._content = LOREMIPSUM;
    }
    return new TextElement(this);
  }

  public buildAnImage(): ImageElement {
    if (this._content === '') {
      const imageDefaults = defaultSettings.imageDefaults;
      const NATURAL_HEIGHT: ValueAndUnit = imageDefaults.natural_height as ValueAndUnit;
      const NATURAL_WIDTH: ValueAndUnit = imageDefaults.natural_width as ValueAndUnit;
      this._content = imageDefaults.defaultImage;
      this._image.naturalSize = new ADimension(NATURAL_HEIGHT, NATURAL_WIDTH);
      this._image.scaledSize = new ADimension(NATURAL_HEIGHT, NATURAL_WIDTH);
      this._image.location = new ALocation();
      this._container.location = new ALocation();
      this._container.naturalSize = new ADimension(NATURAL_HEIGHT, NATURAL_WIDTH)
    }
    return new ImageElement(this);
  }

  public buildAContainer(): PageContainer {
    this._isContainer = true;
    return new PageContainer(this);
  }
}
