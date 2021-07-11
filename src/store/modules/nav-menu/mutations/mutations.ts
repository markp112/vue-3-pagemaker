import { MutationTree } from 'vuex';
import { NavMenuItem } from '../../../../classes/base/navbar/nav-menu/NavMenuItem';
import { State } from '../state/nav-menu';

export enum MutationTypes {
  ADD_NAV_MENU_ITEM = 'Add_Nav_Menu_Item',
  INIT_NAV_MENU_ITEMS = 'Init_Nav_Menu_Items',
};

export type Mutations<S = State> = {
  [MutationTypes.INIT_NAV_MENU_ITEMS](state: S, payload: boolean): void,
  [MutationTypes.ADD_NAV_MENU_ITEM](state: S, payload: NavMenuItem): void,
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_NAV_MENU_ITEM](state, payload: NavMenuItem) {
    state.navMenutItems.push(payload);
  },
  [MutationTypes.INIT_NAV_MENU_ITEMS](state, payload: boolean) {
    state.navMenutItems = [];
  }
};
