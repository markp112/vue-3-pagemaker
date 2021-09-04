import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import { PageElementClasses } from '@/classes/page-elements/factory/page-elements-factory';
import { Notification } from '@/models/notification/notification';
import { state } from '../state/state';
import { FirebaseDataBuilder } from '@/classes/page-elements/firebase/builder/firebase-data-builder';
import { DeltaPositionChange } from '@/views/page-builder/models/mouse-position';
import { Image } from '@/classes/page-elements/image-raw/image-raw';

export enum ActionTypes {
  UPDATE_PAGE_ID = 'updatePageId',
  CLEAR_PAGE_ELEMENTS = 'clearPageElements',
  UPDATE_EDITED_COMPONENT = 'updateEditedComponent',
  UPDATE_SHOW_EDIT_DELETE = 'updateShowEditDelete',
  ADD_A_PAGE_ELEMENT = 'addAPageElement',
  DELETE_A_PAGE_ELEMENT = 'DeleteAPageElement',
  SAVE_PAGE_CONTENT = 'savePageContent',
  UPDATE_PAGE_ELEMENTS = 'updatePageElements',
  UPDATE_CONTENT = 'updateComponentContent',
  UPDATE_LOCATION  = 'updateLocation',
  UPDATE_IMAGE = 'updateImage',
  UPDATE_PAN_FLAG = 'updatePanFlag',
  UPDATE_DRAG_FLAG = 'updateDragFlag',
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
  [ActionTypes.UPDATE_LOCATION]({ commit }: AugmentedActionContext, deltaChange: DeltaPositionChange) : void,
  [ActionTypes.UPDATE_CONTENT]({ commit }: AugmentedActionContext, content: string) : void,
  [ActionTypes.UPDATE_IMAGE]({ commit }: AugmentedActionContext, image: Image) : void,
  [ActionTypes.UPDATE_PAN_FLAG]({ commit }: AugmentedActionContext, toggle: boolean) : void,
  [ActionTypes.UPDATE_DRAG_FLAG]({ commit }: AugmentedActionContext, toggle: boolean) : void,
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

  [ActionTypes.UPDATE_LOCATION]({ commit }, deltaChange) {
    commit(MutationTypes.SET_LOCATION, deltaChange);
  },

  [ActionTypes.UPDATE_CONTENT]({ commit }, content) {
    commit(MutationTypes.SET_COMPONENT_CONTENT, content)
  },

  [ActionTypes.UPDATE_IMAGE]({ commit }, image) {
    commit(MutationTypes.SET_IMAGE, image)
  },

  [ActionTypes.UPDATE_PAN_FLAG]({ commit }, toggle) {
    commit(MutationTypes.SET_PAN_FLAG, toggle)
  },

  [ActionTypes.UPDATE_DRAG_FLAG]({ commit }, toggle) {
    commit(MutationTypes.SET_DRAG_FLAG, toggle)
  },
}
