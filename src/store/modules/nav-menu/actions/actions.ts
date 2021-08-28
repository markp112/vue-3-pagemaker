import { NavMenuItem } from '@/classes/base/navbar/nav-menu/NavMenuItem';
import { ActionContext, ActionTree } from 'vuex';
import {  Mutations, MutationTypes } from '../mutations/mutations';
import { State } from '../state/state';
import { RootState } from '@/store';
import { menuWhenLoggedIn, menuWhenLoggedOut } from '../menu-data/navMenuData';

export enum ActionTypes {
  CREATE_NAV_MENU_SIGNED_IN = 'CREATE_NAV_MENU_SIGNED_IN',
  CREATE_NAV_MENU_SIGNED_OUT = 'CREATE_NAV_MENU_SIGNED_OUT',
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
        payload: Parameters<Mutations[K]>[1]
      ): ReturnType <Mutations[K]>
    } & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ActionTypes.CREATE_NAV_MENU_SIGNED_IN]({commit}: AugmentedActionContext, payload: boolean): void,
  [ActionTypes.CREATE_NAV_MENU_SIGNED_OUT]({commit}: AugmentedActionContext, payload: boolean): void,
}

export const actions: ActionTree<State, RootState> & Actions = {

  async [ActionTypes.CREATE_NAV_MENU_SIGNED_IN]({ commit }, payload: boolean) {
    commit(MutationTypes.INIT_NAV_MENU_ITEMS, true);
    menuWhenLoggedIn.forEach(menuItem => {
      const navMenuItem = new NavMenuItem(menuItem.id, menuItem.navText, menuItem.navLink, menuItem.isVisible);
      commit(MutationTypes.ADD_NAV_MENU_ITEM, navMenuItem);
    });
  },

  async [ActionTypes.CREATE_NAV_MENU_SIGNED_OUT]({ commit }, payload: boolean) {
    commit(MutationTypes.INIT_NAV_MENU_ITEMS, true);
    menuWhenLoggedOut.forEach(menuItem => {
      const navMenuItem = new NavMenuItem(menuItem.id, menuItem.navText, menuItem.navLink, menuItem.isVisible);
      commit(MutationTypes.ADD_NAV_MENU_ITEM, navMenuItem);
    });
  },
}
