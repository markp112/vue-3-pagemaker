import { ASitePage } from '@/classes/page/page';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from '../state/state';

export type Getters = {
  pages(state: State): ASitePage [],
  currentPage(state: State): ASitePage,
};

export const getters: GetterTree<State, RootState> & Getters = {

  pages(state) {
    return state.pages;
  },

  currentPage(state) {
    return state.currentPage;
  },

}
