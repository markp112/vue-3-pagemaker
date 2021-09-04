import { ALocation } from '@/classes/base/location/a-location';
import { PageElementClasses, ROOT } from '@/classes/page-elements/factory/page-elements-factory';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { Image } from '@/classes/page-elements/image-raw/image-raw';
import { PageContainer } from '@/classes/page-elements/page-container/page-container';
import { DeltaPositionChange } from '@/views/page-builder/models/mouse-position';
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
  SET_LOCATION = 'setLocation',
  SET_COMPONENT_CONTENT = 'setComponentContent',
  SET_IMAGE = 'setImage',
  SET_PAN_FLAG = 'setPanFlag',
  SET_DRAG_FLAG = 'setDragFlag',
};

export type Mutations<S = State> = {
  [MutationTypes.ADD_A_PAGE_ELEMENT](state: S, element: PageElementClasses): void,
  [MutationTypes.CLEAR_PAGE_ELEMENTS](state: S, dummy: boolean): void,
  [MutationTypes.DELETE_A_PAGE_ELEMENT](state: S, dummy: boolean): void,
  [MutationTypes.SET_EDITED_COMPONENT_REF](state: S, element: PageElementClasses): void,
  [MutationTypes.SET_PAGE_ELEMENTS](state: S, elements: PageElementClasses[]): void,
  [MutationTypes.SET_PAGE_ID](state: S, pageId: string): void,
  [MutationTypes.SET_SHOW_EDIT_DELETE](state: S, toggle: boolean): void,
  [MutationTypes.SET_LOCATION](state: S, deltaChange: DeltaPositionChange): void,
  [MutationTypes.SET_COMPONENT_CONTENT](state: S, content: string): void,
  [MutationTypes.SET_IMAGE](state: S, image: Image): void,
  [MutationTypes.SET_PAN_FLAG](state: S, toggle: boolean): void,
  [MutationTypes.SET_DRAG_FLAG](state: S, toggle: boolean): void,

};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_A_PAGE_ELEMENT](state, element) {
    if (element.parentRef === ROOT) {
      // state.pageElements = [];
      state.pageElements.push(element);
    } else {
      // if (state.pageElements.length > 0) {
        const index = state.pageElements.findIndex(elem => elem.ref === element.parentRef);
        // const theParent = state.pageElements.filter(elem => elem.ref === element.parentRef)[0] as PageContainer;
        const theParent = state.pageElements[index] as PageContainer;
        theParent.addNewElement(element);
        state.pageElements.splice(index);
        state.pageElements.push(theParent);
      // }
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
  },

  [MutationTypes.SET_LOCATION](state, deltaChange) {
    if (state.editedComponent) {
      let currentLeft = Number(state.editedComponent.location.left.value);
      let currentTop = Number(state.editedComponent?.location.top.value);
      currentLeft += deltaChange.deltaX;
      currentTop += deltaChange.deltaY;
      state.editedComponent.updateLocation(currentLeft, currentTop);
    }
  },

  [MutationTypes.SET_COMPONENT_CONTENT](state, content) {
    if (state.editedComponent) {
      state.editedComponent.content = content;
    }
  },

  [MutationTypes.SET_IMAGE](state, image) {
    if (state.editedComponent) {
      const imageElement: ImageElement = state.editedComponent as ImageElement;
      imageElement.content = image.content;
      imageElement.image.naturalSize = image.naturalSize;
      imageElement.scaledSize.width.value = image.naturalSize.width.value;
      imageElement.scaledSize.height.value = image.naturalSize.height.value;
      imageElement.maintainRatio = image.maintainRatio;
    }
  },

  [MutationTypes.SET_PAN_FLAG](state, toggle) {
    state.panFlag = toggle
  },

  [MutationTypes.SET_DRAG_FLAG](state, toggle) {
    state.dragFlag = toggle
  },

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
