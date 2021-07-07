import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { SnackBar } from '@/classes/base/notification/snackbar/snackbar'

describe('Snackbar', () => {

  let snackbar: SnackBar;

  it('should return a single instance of the snackbar class', () => {
    snackbar = SnackBar.getInstance();
    const snackbarMessage: SnackbarMessage = {
      message: 'message',
      show: true,
      title: 'title',
      type: 'info',
      duration: 1,
    };
    snackbar.snackbarMessage = snackbarMessage;
    const snackbar2 = SnackBar.getInstance();
    expect(snackbar.snackbarMessage).toEqual(snackbar2.snackbarMessage);
  });

  it('should set ')
})
