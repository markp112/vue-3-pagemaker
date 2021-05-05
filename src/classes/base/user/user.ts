import { UserInterface } from './model/';

export class AUser implements UserInterface {
  _email = '';
  _password = '';
  _isSignedIn = false;;
  _id = '';
  _refreshToken = '';
  _displayName = '';


  constructor();
  constructor(email: string, id: string, signedIn: boolean, refreshToken: string, displayName: string | null); 
  constructor(email?: string, id?: string, signedIn?: boolean, refreshToken?: string, displayName?: string | null) {
    this._email = email ? email : '';
    this._id = id ? id: '';
    this._isSignedIn = signedIn ? signedIn : false;
    this._refreshToken = refreshToken ? refreshToken : '';
    this._displayName = displayName ? displayName : '';
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get password(): string {
    return atob(this._password);
  }

  public set password(password: string) {
    this._password = btoa(password);
  }

  public get isSignedIn(): boolean {
    return this._isSignedIn;
  }

  public set isSignedIn(isSignedIn: boolean) {
    this._isSignedIn = isSignedIn;
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get refreshToken(): string {
    return this._refreshToken;
  }

  public set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public set displayName(displayName: string) {
    this._displayName = displayName;
  }
}