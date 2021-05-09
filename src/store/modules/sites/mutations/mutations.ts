import { MutationTree } from 'vuex';
import { ASite } from '@/classes/base/sites/ASite';
import { State } from '../state/state';

export enum MutationTypes {
  ADD_SITE = 'addSite',
  INITIALISE = 'intialise',
  UPDATE_SITE = 'updateSite',
  SET_SITE = 'setSite',
};

export type Mutations<S = State> = {
  [MutationTypes.ADD_SITE](state: S, site: ASite): void,
  [MutationTypes.INITIALISE](state: S, payload: boolean): void,
  [MutationTypes.SET_SITE](state: S, siteId: string): void,
  [MutationTypes.UPDATE_SITE](state: S, site: ASite): void,
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_SITE](state: State, site: ASite) {
    state.sites.push(site);
  },

  [MutationTypes.INITIALISE](state: State, payload: boolean) {
    state.sites = [];
  },

  [MutationTypes.SET_SITE](state: State, siteId: string) {
    state.currentSite = state.sites.filter(site => site.siteId === siteId)[0];
  },

  [MutationTypes.UPDATE_SITE](state: State, site: ASite) {
    const sites = state.sites.filter(existingSite => existingSite.siteId !== site.siteId);
    sites.push(site);
    state.sites.push(site);
  }
}
