import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { initSnackbarMessage } from '@/classes/base/notification/snackbar/snackbarGenerator';

export type State = {
  snackbarMessage: SnackbarMessage;
};

export const state: State = {
  snackbarMessage: initSnackbarMessage,
};
