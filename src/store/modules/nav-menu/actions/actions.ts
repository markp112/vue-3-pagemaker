import { NavMenuItem } from '@/classes/base/navbar/nav-menu/NavMenuItem';
import { ActionContext, ActionTree } from 'vuex';
import {  Mutations, MutationTypes } from '../mutations/mutations';
import { State } from '../state/nav-menu';
import { State as RootState } from '@/store';
import { menuWhenLoggedIn, menuWhenLoggedOut } from '../menu-data/navMenuData';

export enum ActionTypes {
  CreateNaVMenuSignedOut = 'CREATE_NAV_MENU_SIGNED_OUT',
  CreateNaVMenuSignedIn = 'CREATE_NAV_MENU_SIGNED_IN',
};

type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType <Mutations[K]>
};

export type Actions = {
  [ActionTypes.CreateNaVMenuSignedIn](context: ActionArguments): void,
  [ActionTypes.CreateNaVMenuSignedOut](context: ActionArguments): void,
}

export const actions: ActionTree<State, RootState> & Actions = {

  async [ActionTypes.CreateNaVMenuSignedIn]({ commit }) {
    commit(MutationTypes.INIT_NAV_MENU_ITEMS, true);
    menuWhenLoggedIn.forEach(menuItem => {
      const navMenuItem = new NavMenuItem(menuItem.id, menuItem.navText, menuItem.navLink, menuItem.isVisible);
      commit(MutationTypes.ADD_NAV_MENU_ITEM, navMenuItem);
    });
  },

  async [ActionTypes.CreateNaVMenuSignedOut]({ commit }) {
    commit(MutationTypes.INIT_NAV_MENU_ITEMS, true);
    menuWhenLoggedOut.forEach(menuItem => {
      const navMenuItem = new NavMenuItem(menuItem.id, menuItem.navText, menuItem.navLink, menuItem.isVisible);
      commit(MutationTypes.ADD_NAV_MENU_ITEM, navMenuItem);
    });
  },
}
