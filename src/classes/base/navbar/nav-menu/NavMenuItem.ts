import { NavMenuItemInterface } from './nav-menu-item';

export class NavMenuItem implements NavMenuItemInterface {
  _id: number;
  _navText: string;
  _navLink: string;
  _isVisible: boolean;

  constructor(
    id: number,
    navText: string,
    navLink: string,
    isVisible: boolean,
  ) {
    this._id = id;
    this._navLink = navLink;
    this._navText = navText;
    this._isVisible = isVisible;
  }

  get navLink(): string {
    return this._navLink;
  }

  get navText(): string {
    return this._navText;
  }

  get id(): number {
    return this._id;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }
}
