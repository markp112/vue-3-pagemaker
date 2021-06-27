import { PageElementClasses } from '@/classes/page-elements/factory/page-elements-factory';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from '../state/state';

export type Getters = {
  pageId(state: State): string,
  editedComponent(state: State): PageElementClasses | undefined,
  pageElements(state: State): PageElementClasses[],
  showEditDelete(state: State): boolean,
};


export const getters: GetterTree<State, RootState> & Getters = {

  pageId(state) {
    return state.pageId;
  },

  editedComponent(state) {
    return state.editedComponent;
  },

  pageElements(state) {
    return state.pageElements;
  },

  showEditDelete(state) {
    return state.showEditDelete;
  }
}

const compare = (a: PageElementClasses, b: PageElementClasses) => {
  if (a && b) {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
  }
  return 0;
}
