import { PageElementClasses } from '@/classes/page-elements/factory/page-elements-factory';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from '../state/state';

export type Getters = {
  pageId(state: State): string,
  editedComponent(state: State): PageElementClasses | undefined,
  getPageElements(state: State): PageElementClasses[],
  showEditDelete(state: State): boolean,
  getPanFlag(state: State): boolean,
  getDragFlag(state: State): boolean,

};

export const getters: GetterTree<State, RootState> & Getters = {

  pageId(state) {
    return state.pageId;
  },

  editedComponent(state) {
    return state.editedComponent;
  },

  getPageElements(state) {
    return state.pageElements;
  },

  showEditDelete(state) {
    return state.showEditDelete;
  },

  getPanFlag(state) {
    return state.panFlag;
  },

  getDragFlag(state) {
    return state.dragFlag;
  },
}

const compare = (a: PageElementClasses, b: PageElementClasses) => {
  if (a && b) {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
  }
  return 0;
}
