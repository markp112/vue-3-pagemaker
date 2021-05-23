import { SnackbarMessage } from './models/snackbar';
import { initSnackbarMessage } from './snackbarGenerator';

export class SnackBar {
  #showSnackbar = false;
  #snackbarMessage: SnackbarMessage = initSnackbarMessage;

  private static instance: SnackBar;

  public static getInstance(): SnackBar {
    if (!SnackBar.instance) {
      SnackBar.instance = new SnackBar();
    }
    return SnackBar.instance;
  }

  showSnackbar() {
    this.#showSnackbar = true;
  }

  hideSnackbar() {
    this.#showSnackbar = false;
  }

  get isShowSnackbar(): boolean {
    return this.#showSnackbar;
  }

  set snackbarMessage(snackbarMessage: SnackbarMessage) {
    this.#snackbarMessage = snackbarMessage;
  }

  get snackbarMessage(): SnackbarMessage {
    return this.#snackbarMessage;
  }
}
