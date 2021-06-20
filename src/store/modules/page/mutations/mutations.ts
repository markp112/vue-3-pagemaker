import { PageElementClasses, ROOT } from '@/classes/page-elements/factory/page-elements-factory';
import { PageContainer } from '@/classes/page-elements/page-container/page-container';
import { MutationTree } from 'vuex';
import { State } from '../state/state';

export enum MutationTypes {
  SET_PAGE_ID = 'setPageId',
  ADD_A_PAGE_ELEMENT = 'addAPageElement',
  DELETE_A_PAGE_ELEMENT = 'deleteAPageElement',
  CLEAR_PAGE_ELEMENTS = 'clearPageElements',
  SET_PAGE_ELEMENTS = 'setPageElements',
  SET_EDITED_COMPONENT_REF = 'setEditedComponentRef',
  SET_SHOW_EDIT_DELETE = 'showEditDelete',
};

export type Mutations<S = State> = {
  [MutationTypes.ADD_A_PAGE_ELEMENT](state: S, element: PageElementClasses): void,
  [MutationTypes.CLEAR_PAGE_ELEMENTS](state: S, dummy: boolean): void,
  [MutationTypes.DELETE_A_PAGE_ELEMENT](state: S, dummy: boolean): void,
  [MutationTypes.SET_EDITED_COMPONENT_REF](state: S, element: PageElementClasses): void,
  [MutationTypes.SET_PAGE_ELEMENTS](state: S, elements: PageElementClasses[]): void,
  [MutationTypes.SET_PAGE_ID](state: S, pageId: string): void,
  [MutationTypes.SET_SHOW_EDIT_DELETE](state: S, toggle: boolean): void,
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_A_PAGE_ELEMENT](state, element) {
    if (element.ref === ROOT) {
      state.pageElements.push(element);
    } else {
      if (state.pageElements.length > 0) {
        const theParent = state.pageElements.filter(elem => elem.ref === element.parentRef)[0] as PageContainer;
        theParent.addNewElement(element);
      }
    }
  },

  [MutationTypes.CLEAR_PAGE_ELEMENTS](state, dummy) {
    state.pageElements = [];
  },

  [MutationTypes.DELETE_A_PAGE_ELEMENT](state, dummy) {
    if (state.editedComponent) {
      state.pageElements = deleteAPageElement(state.pageElements, state.editedComponent.ref)
    }
  },

  [MutationTypes.SET_EDITED_COMPONENT_REF](state, element) {
    state.editedComponent = element;
  },

  [MutationTypes.SET_PAGE_ELEMENTS](state, elements) {
    state.pageElements = elements;
  },

  [MutationTypes.SET_PAGE_ID](state, pageId) {
    state.pageId = pageId;
  },

  [MutationTypes.SET_SHOW_EDIT_DELETE](state, toggle) {
    state.showEditDelete = toggle;
  }

}

const deleteAPageElement = function (pageElements: PageElementClasses[], elementRef: string): PageElementClasses[] {
  const tempElements =  pageElements.filter(element => {
    if (element.isContainer) {
      const container = element as PageContainer;
      container.elements = deleteAPageElement(container.elements, elementRef);
    }
    return element.ref !== elementRef;
  });
  return tempElements;
}
