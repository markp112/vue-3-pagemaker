export type SnackbarTypes =
  | 'error'
  | 'info'
  | 'warning'
  | 'success';

export interface SnackbarMessage {
  message: string;
  title: string;
  type: SnackbarTypes;
  duration: number;
  show: boolean;
};
