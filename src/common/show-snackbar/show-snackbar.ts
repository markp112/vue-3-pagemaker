import { SnackbarMessage, SnackbarTypes } from '@/classes/base/notification/snackbar/models/snackbar';
import { SnackBar } from '@/classes/base/notification/snackbar/snackbar';
import { SnackBarGenerator } from '@/classes/base/notification/snackbar/snackbarGenerator';
import { snackbarActionTypes } from '@/store/modules/snackbar';
import { useStore } from '@/store';

const DEFAULT_DURATION = 5000;

export const showTheSnackbar = (title: string, message: string, type: SnackbarTypes ) => {
  const store = useStore();
  let snackbarType;
  switch (type) {
    case 'error':
      snackbarType = setSnackbarError(title, message);
      break;
    case 'info':
      snackbarType = setSnackbarInfo(title, message);
      break;
    case 'success':
      snackbarType = setSnackbarSuccess(title, message);
      break;
    case 'warning':
      snackbarType = setSnackbarWarning(title, message);
      break;
  }
  store.dispatch(snackbarActionTypes.SET_SNACKBAR_MESSAGE, snackbarType);
  store.dispatch(snackbarActionTypes.SHOW_SNACKBAR, true);
  setTimeout(() => {
    console.log('%c%s', 'color: #1d3f73', 'setTimeout');
    store.dispatch(snackbarActionTypes.SHOW_SNACKBAR, false);

  }, snackbarType.duration);
}

const setSnackbarError = (title: string, message: string): SnackbarMessage=> {
  return setBaseProperties(message, title, 'error');
};

const setSnackbarInfo = (title: string, message: string): SnackbarMessage=> {
  return setBaseProperties(message, title, 'info');
};

const setSnackbarSuccess = (title: string, message: string): SnackbarMessage=> {
  return setBaseProperties(message, title, 'success');
};

const setSnackbarWarning = (title: string, message: string): SnackbarMessage=> {
  return setBaseProperties(message, title, 'warning');
};

const setBaseProperties = (
  message: string,
  title: string,
  type: SnackbarTypes,
  duration?: number
): SnackbarMessage  => {
  return {
    duration: duration ? duration : DEFAULT_DURATION,
    message: message,
    title: title,
    show: true,
    type: type
  };
};
