export type statusCodes = "ok" | "Error" | 'not set';
export type defaultNotificationMessages = "Sucess" | string;

export interface Notification {
  status: statusCodes;
  message: defaultNotificationMessages;
}

export const notificationDefault: Notification = { status: "not set", message: "" };
