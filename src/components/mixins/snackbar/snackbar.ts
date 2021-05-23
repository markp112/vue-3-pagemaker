import { SnackbarTypes, SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { Notification, notificationDefault } from '@/models/notification/notification';
import { AllActionTypes, useStore } from '@/store/';

import { Vue } from "vue-class-component";

export default class SnackbarMixin extends Vue {
  store = useStore();
  showSnackbar(notification: Notification, title: string) {
    const snackbarType: SnackbarTypes =
      notification.status === "ok"
        ? SnackbarTypes.Success
        : SnackbarTypes.Error;
    const snackbarMessage: SnackbarMessage = {
      message: notification.message,
      title: title,
      type: snackbarType,
      duration: 3000,
      show: true
    };
    this.store.dispatch(AllActionTypes.SHOW_SNACKBAR, snackbarMessage);
  }
}
