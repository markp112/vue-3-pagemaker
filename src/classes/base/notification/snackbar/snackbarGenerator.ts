import { SnackbarMessage } from './models/snackbar';

export const initSnackbarMessage: SnackbarMessage = {
  message: '',
  title: '',
  type: 'success',
  duration: 5000,
  show: false
};

export class SnackBarGenerator {
  static _snackBar: SnackbarMessage = initSnackbarMessage;

  private static setBaseProperties(
    message: string,
    title: string,
    duration?: number
  ): void {
    this._snackBar.message = message;
    this._snackBar.title = title;
    this._snackBar.duration = duration === undefined ? 5000 : duration;
    this._snackBar.show = true;
  }

  static snackbarError(
    title: string,
    message: string,
    duration?: number
  ): SnackbarMessage {
    this.setBaseProperties(message, title, duration);
    this._snackBar.type = 'error';
    return this._snackBar;
  }

  static snackbarInfo(
    title: string,
    message: string,
    duration?: number
  ): SnackbarMessage {
    this.setBaseProperties(message, title, duration);
    this._snackBar.type = 'info';
    return this._snackBar;
  }

  static snackbarSuccess(
    title: string,
    message: string,
    duration?: number
  ): SnackbarMessage {
    this.setBaseProperties(message, title, duration);
    this._snackBar.type = 'success';
    return this._snackBar;
  }

  static snackbarWarning(
    title: string,
    message: string,
    duration?: number
  ): SnackbarMessage {
    this.setBaseProperties(message, title, duration);
    this._snackBar.type = 'warning';
    return this._snackBar;
  }
}
