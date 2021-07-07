import { SnackbarTypes } from '@/classes/base/notification/snackbar/models/snackbar';
import { SnackBar } from '@/classes/base/notification/snackbar/snackbar';
import { SnackBarGenerator } from '@/classes/base/notification/snackbar/snackbarGenerator';


export const showTheSnackbar = (title: string, message: string, type: SnackbarTypes ) => {
  const snackbar = SnackBar.getInstance();
  let snackbarType;
  switch (type) {
    case 'error':
      snackbarType = SnackBarGenerator.snackbarError(title, message);
      break;
    case 'info':
      snackbarType = SnackBarGenerator.snackbarInfo(title, message);
      break;
    case 'success':
      snackbarType = SnackBarGenerator.snackbarSuccess(title, message);
      break;
    case 'warning':
      snackbarType = SnackBarGenerator.snackbarWarning(title, message);
      break;
  }
  snackbar.snackbarMessage = snackbarType;
  // snackbar.showSnackbar();
}
