import { Site } from './model';

interface FirebaseData {
  [key: string]: any;
}

export class ASite implements Site {
  DEFAULT_DATE = '01 Jan 1970';
  _siteId: string;
  _name: string;
  _created: Date;
  _description: string = '';
  _url: string = '';
  _image: string = '';
  _published: Date = new Date(this.DEFAULT_DATE);

  constructor();
  constructor( siteId: string, name: string, created: Date);
  constructor( siteId?: string, name?: string, created?: Date) {
    this._siteId = siteId ? siteId : '';
    this._name = name ? name : '';
    this._created = created ? created : new Date(this.DEFAULT_DATE);
  }

  get siteId(): string {
    return this._siteId;
  };

  get name(): string {
    return this._name;
  };

  get created(): Date {
    return this._created;
  };

  get description(): string {
    return this._description;
  };

  set description(description: string) {
    this._description = description;
  }

  get url(): string {
    return this._url;
  };

  set url(url: string) {
    this._url = url;
  }

  get image(): string {
    return this._image;
  };

  set image(image: string) {
    this._image = image;
  }

  get published(): Date {
    return this._published;
  };

  set published(published: Date) {
    this._published = published;
  }

  toObject() {
    let site:FirebaseData = {
      siteId: this._siteId,
      name: this._name,
      created: this._created,
    };
    if (this._description !== '') site.description = this._description;
    if (this._url !== '') site.url = this._url;
    if (this._published !== new Date(this.DEFAULT_DATE)) site.published = this._published;
    if (this._image !== '') site.image = this._image;
    return site;
  }
}
