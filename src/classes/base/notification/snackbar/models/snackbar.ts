export enum SnackbarTypes {
  Error = "error",
  Info = "info",
  Warning = "warning",
  Success = "success"
};

export interface SnackbarMessage {
  message: string;
  title: string;
  type: SnackbarTypes;
  duration: number;
  show: boolean;
};
