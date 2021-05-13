import { GetterTree } from 'vuex';
import { State } from '../state/state';
import { RootState } from '@/store';
import { ASite } from '@/classes/base/sites/ASite';

export type Getters = {
  siteList(state: State): ASite[],
  siteId(state: State): string,
  currentSite(state: State): ASite,
};

export const getters: GetterTree<State, RootState> & Getters = {
  siteList(state) {
    return state.sites;
  },

  siteId(state) {
    return state.currentSite.siteId;
  },

  currentSite(state) {
    return state.currentSite;
  },
}
