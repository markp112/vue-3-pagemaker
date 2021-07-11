import { NavMenuItem } from '@/classes/base/navbar/nav-menu/NavMenuItem';
import { GetterTree } from 'vuex';
import { State } from '../state/nav-menu';
import { RootState } from '@/store';

export type Getters = {
  navMenuItems(state: State): NavMenuItem[];
}

export const getters: GetterTree <State, RootState> & Getters = {
  navMenuItems(state) {
    return state.navMenutItems;
  }
}
