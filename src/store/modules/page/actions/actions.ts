import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import { PageElementClasses } from '@/classes/page-elements/factory/page-elements-factory';
import { Notification } from '@/models/notification/notification';
import { state } from '../state/state';
import { FirebaseDataBuilder } from '@/classes/page-elements/firebase/builder/firebase-data-builder';

export enum ActionTypes {
  UPDATE_PAGE_ID = 'updatePageId',
  CLEAR_PAGE_ELEMENTS = 'clearPageElements',
  UPDATE_EDITED_COMPONENT = 'updateEditedComponent',
  UPDATE_SHOW_EDIT_DELETE = 'updateShowEditDelete',
  ADD_A_PAGE_ELEMENT = 'addAPageElement',
  DELETE_A_PAGE_ELEMENT = 'DeleteAPageElement',
  SAVE_PAGE_CONTENT = 'savePageContent',
  UPDATE_PAGE_ELEMENTS = 'updatePageElements',
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
        payload: Parameters<Mutations[K]>[1]
      ): ReturnType <Mutations[K]>
    } & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ActionTypes.ADD_A_PAGE_ELEMENT]({ commit }: AugmentedActionContext, element: PageElementClasses): void,
  [ActionTypes.CLEAR_PAGE_ELEMENTS]({ commit }: AugmentedActionContext, dummy: boolean): void,
  [ActionTypes.DELETE_A_PAGE_ELEMENT]({ commit }: AugmentedActionContext, dummy: boolean): void,
  [ActionTypes.SAVE_PAGE_CONTENT]({ commit }: AugmentedActionContext, dummy: boolean): Promise<Notification>,
  [ActionTypes.UPDATE_EDITED_COMPONENT]({ commit }: AugmentedActionContext, element: PageElementClasses): void,
  [ActionTypes.UPDATE_PAGE_ELEMENTS]({ commit }: AugmentedActionContext, element: PageElementClasses[]): void,
  [ActionTypes.UPDATE_PAGE_ID]({ commit }: AugmentedActionContext, pageId: string): void,
  [ActionTypes.UPDATE_SHOW_EDIT_DELETE]({ commit }: AugmentedActionContext, toggle: boolean): void,
};

export const actions: ActionTree<State, RootState> & Actions = {

  [ActionTypes.ADD_A_PAGE_ELEMENT]({ commit }, element) {
    commit(MutationTypes.ADD_A_PAGE_ELEMENT, element);
  },

  [ActionTypes.CLEAR_PAGE_ELEMENTS]({ commit }, dummy) {
    commit(MutationTypes.CLEAR_PAGE_ELEMENTS, true);
  },

  [ActionTypes.DELETE_A_PAGE_ELEMENT]({ commit }, dummy) {
    commit(MutationTypes.DELETE_A_PAGE_ELEMENT, true);
  },

  [ActionTypes.SAVE_PAGE_CONTENT]({ commit }, dummy) {
    const firebaseData = new FirebaseDataBuilder();
    return new Promise((resolve, reject) => {
      const pageElements = state.pageElements;
      const pageId = state.pageId;
      firebaseData.savePageData(pageElements, pageId)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  [ActionTypes.UPDATE_EDITED_COMPONENT]({ commit }, element) {
    commit(MutationTypes.SET_EDITED_COMPONENT_REF, element);
  },

  [ActionTypes.UPDATE_PAGE_ELEMENTS]({ commit }, elements) {
    commit(MutationTypes.SET_PAGE_ELEMENTS, elements);
  },

  [ActionTypes.UPDATE_PAGE_ID]({ commit }, pageId) {
    commit(MutationTypes.SET_PAGE_ID, pageId);
  },

  [ActionTypes.UPDATE_SHOW_EDIT_DELETE]({ commit }, toggle) {
    commit(MutationTypes.SET_SHOW_EDIT_DELETE, toggle);
  },
}
