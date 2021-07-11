import { ASitePage } from '@/classes/page/page';
import { MutationTree } from 'vuex';
import { State } from '../state/state';

export enum MutationTypes {
  ADD_PAGE = 'addPage',
  INITIALISE = 'initialise',
  SET_CURRENT_PAGE = 'setCurrentPage',
};

export type Mutations<S = State> = {
  [MutationTypes.ADD_PAGE](state: S, page: ASitePage): void,
  [MutationTypes.INITIALISE](state: S, payload: boolean): void,
  [MutationTypes.SET_CURRENT_PAGE](state: S, page: ASitePage): void,
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_PAGE](state, sitePage: ASitePage) {
    state.pages.push(sitePage);
  },

  [MutationTypes.INITIALISE](state, payload: boolean) {
    state.pages = [];
  },

  [MutationTypes.SET_CURRENT_PAGE](state, page) {
    state.currentPage = page;
  }
};
