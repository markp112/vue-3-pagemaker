import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { Style } from '@/classes/base/style/style';
import { SiteDefaults } from '@/classes/settings/site-defaults/site-defaults';
import { PageElementBuilder } from '../builder/page-element-builder';
import { ImageElementFirebaseData } from '../firebase/model/firebase-model';
import { PageElement } from '../page-element-base/page-element-base';
import { ContainerProps, ImageElementInterface, ImageProps } from './model/image-element-model';
import { Image } from '../image-raw/image-raw';

export class ImageElement extends PageElement implements ImageElementInterface {
  private _ratio: number;
  private _maintainRatio: boolean;
  private _container: ContainerProps = {
    location: new ALocation(),
    naturalSize: new ADimension(),
  };
  private _image: ImageProps = {
    location: new ALocation(),
    naturalSize: new ADimension(),
    scaledSize: new ADimension(),
  };;

  constructor(builder: PageElementBuilder) {
    super(builder);
    this._maintainRatio = true;
    this._image.location = builder.imageLocation;
    this._image.naturalSize = builder.naturalSize;
    this._image.scaledSize = builder.scaledSize;
    this._container.location = builder.containerLocation;
    this._container.naturalSize = builder.containerDimensions;
    this._ratio = this.calcRatio(
      this._image.naturalSize.width.value,
      this._image.naturalSize.height.value
    );
  }

  toString(): string {
    throw new Error('Method not implemented.');
  }

  get image(): ImageProps {
    return this._image;
  }

  get container(): ContainerProps {
    return this._container;
  }

  get naturalSize(): ADimension {
    return this._image.naturalSize;
  }

  set naturalSize(size: ADimension) {
    this._image.naturalSize = size;
    this._ratio = this.calcRatio(
      this._image.naturalSize.width.value,
      this._image.naturalSize.height.value
    );
  }

  get scaledSize(): ADimension {
    return this._image.scaledSize;
  }

  set scaledSize(dimensions: ADimension) {
    this._image.scaledSize = dimensions;
  }

  get ratio(): number {
    return this._ratio;
  }

  get maintainRatio() {
    return this._maintainRatio;
  }

  set maintainRatio(maintainRatio: boolean) {
    this._maintainRatio = maintainRatio;
  }

  get containerDimensions(): ADimension {
    return this._container.naturalSize;
  }

  set containerDimensions(dimensions: ADimension) {
    if (dimensions.width > this.scaledSize.width) this.scaledSize.width = dimensions.width;
    if (dimensions.height > this.scaledSize.height) this.scaledSize.height = dimensions.height;
    this._container.naturalSize = dimensions;
  }

  set containerLocation(location: ALocation) {
    this._container.location = location;
  }

  get containerLocation(): ALocation {
    return this._container.location;
  }

  get imageLocation(): ALocation {
    return this._image.location;
  }

  set imageLocation(location: ALocation) {
    this._image.location = location;
  }

  public getContainerStyles(): string {
    let style = '';
    style += this._container.naturalSize.toStyle();
    style += this._container.location.toStyle();
    const styles: Style[] = this.styles;
    if (styles.length > 0) {
      styles.forEach(element => {
        style += `${element.style}:${element.value};`;
      });
    }
    return style;
  }

  public updateLocation(newX: number, newY: number): void {
    this._container.location.top.value = newY;
    this._container.location.left.value = newX;
  }

  public getImageStyle(): string {
    let style = '';
    style += this._image.scaledSize.toStyle();
    style += this._image.location.toStyle();
    const styles: Style[] = this.styles;
    if (styles.length > 0) {
      styles.forEach(element => {
        style += `${element.style}:${element.value};`;
      });
    }
    return style;
  }

  public getElementContent(): ImageElementFirebaseData {
    return Object.assign(this.getBaseElementContent(), {
      naturalSize: this._image.naturalSize.toObject(),
      scaledSize: this._image.scaledSize.toObject(),
      ratio: this._ratio,
      maintainRatio: this._maintainRatio,
      containerDimensions: this._container.naturalSize.toObject(),
      containerLocation: this._container.location.toObject(),
      location: this._image.location.toObject(),
    });
  }

  public setDefaultStyle() {
    if (this.styles.length === 0) {
      const siteDefaults = SiteDefaults.getInstance();
      const siteColours = siteDefaults.colours;
      this.addStyle(this.constructStyle('color', siteColours.textOnSurface));
      this.addStyle(this.constructStyle('width', `${this.scaledSize.width}px`));
      this.addStyle(this.constructStyle('height', `${this.scaledSize.height}px`));
    }
  }

  public setImage(image: Image) {
    this.content = image.content;
    if (image.naturalSize.width.value === 0) {
      image.naturalSize.width.value = 300;
    }
    if (image.naturalSize.height.value === 0) {
      image.naturalSize.height.value = 250;
    }
    this._image.naturalSize = image.naturalSize;
    this._ratio = image.ratio;
    this._maintainRatio = image.maintainRatio;
  }

  private calcRatio(width: number, height: number): number {
    return Math.min(width / height, height / width);
  }

}
