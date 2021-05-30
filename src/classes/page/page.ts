import { Page } from './model/page';
import { convertTimeStampDate } from '@/common/dates/date-functions';

export class ASitePage implements Page {
  _name: string;
  _icon: string;
  _created: Date;
  _edited: Date;
  _active: boolean;

  constructor()
  constructor(data?: Page)
  constructor(data?: Page) {
    if (data) {
      this._name = data.name;
      this._active = data.active;
      this._created = convertTimeStampDate(data.created);
      this._edited = convertTimeStampDate(data.edited);
      this._icon = data.icon;
    } else {
      this._name = "";
      this._icon = "";
      this._created = new Date();
      this._edited = new Date();
      this._active = false;
    }
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get icon(): string {
    return this._icon;
  }
  set icon(icon:string) {
    this._icon = icon;
  }

  get created(): Date {
    return this._created;
  }

  set created(created: Date) {
    this._created = created;
  }

  get edited(): Date {
    return this._edited;
  }

  set edited(edited: Date) {
    this._edited = edited;
  }

  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    this._active = active;
  }

  getPageDataAsObject(): Page {
    const page = {
      name: this._name,
      icon: this._icon,
      created: this._created,
      edited: this.edited,
      active: this.active
    };
    return page;
  }
}
