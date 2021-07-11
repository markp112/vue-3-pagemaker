export type ActionEventTypes = "Navigation";

export interface ActionEvent {
  actionType: ActionEventTypes;
  eventAction: string;
}
