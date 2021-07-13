import { Site } from './model';

interface FirebaseData {
  [key: string]: any;
};

export const DEFAULT_DATE = '01 Jan 1970';
export const DEFAULT_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/page-maker-69fb1.appspot.com/o/hDkHXv0i06dVCPmIfRKefti9t4p1%2Fimages%2Fsite2.png?alt=media&token=46a82b23-1066-4c78-b70a-d7b69728e531';

export class ASite implements Site {
  _siteId: string;
  _name: string;
  _created: Date;
  _description = '';
  _url = '';
  _image = DEFAULT_IMAGE;
  _published: Date = new Date(DEFAULT_DATE);

  constructor();
  constructor( siteId: string, name: string, created: Date);
  constructor( siteId?: string, name?: string, created?: Date) {
    this._siteId = siteId ? siteId : '';
    this._name = name ? name : '';
    this._created = created ? created : new Date(DEFAULT_DATE);
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
    const site: FirebaseData = {
      siteId: this._siteId,
      name: this._name,
      created: this._created,
    };
    if (this._description !== '') site.description = this._description;
    if (this._url !== '') site.url = this._url;
    if (this._published !== new Date(DEFAULT_DATE)) site.published = this._published;
    if (this._image !== '') site.image = this._image;
    return site;
  }
}
