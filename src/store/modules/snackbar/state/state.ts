import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { initSnackbarMessage } from '@/classes/base/notification/snackbar/snackbarGenerator';

export type State = {
  showSnackbar: boolean;
  snackbar: SnackbarMessage;
};

export const state: State = {
  showSnackbar: false,
  snackbar: initSnackbarMessage,
};
