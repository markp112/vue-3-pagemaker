import { NavMenuItem } from '../../../../classes/base/navbar/nav-menu/NavMenuItem';

type menuItems = NavMenuItem[];

export type State = {
  navMenutItems: menuItems;
};

export const state: State = {
  navMenutItems: [],
};
