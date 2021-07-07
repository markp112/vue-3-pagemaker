import { SnackbarMessage } from './models/snackbar';
import { initSnackbarMessage } from './snackbarGenerator';

export class SnackBar {
  _showSnackbar = false;
  _snackbarMessage: SnackbarMessage = initSnackbarMessage;

  private static instance: SnackBar;

  public static getInstance(): SnackBar {
    if (!SnackBar.instance) {
      SnackBar.instance = new SnackBar();
    }
    return SnackBar.instance;
  }

  showSnackbar(): void {
    // this._showSnackbar = true;
    this.snackbarMessage.show = true;
  }

  hideSnackbar(): void {
    // this._showSnackbar = false;
    this._snackbarMessage.show = false;
  }

  get isShowSnackbar(): boolean {
    // const show = this._showSnackbar;
    // return show;
    return this._snackbarMessage.show;
  }

  set snackbarMessage(snackbarMessage: SnackbarMessage) {
    this._snackbarMessage = snackbarMessage;
  }

  get snackbarMessage(): SnackbarMessage {
    return this._snackbarMessage;
  }
}
