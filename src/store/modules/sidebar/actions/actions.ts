import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import firebase from "firebase";
import { Notification, notificationDefault } from '@/models/notification/notification';
import { SidebarElement, SideBarElementFlattend } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';

const SIDEBARCOLLECTION = 'component-definitions';

export enum ActionTypes {
  LOAD_SIDEBAR_ELEMENTS = 'loadSidebarElements',
  SAVE_SIDEBAR_EDITOR_ELEMENT = 'saveSidebarEditorElement',
  SHOW_SIDEBAR_ACTIVE_MENU = 'showSidebarActiveMenu',
  SHOW_TEXT_MODAL = 'showTextModal',
  SET_SETTINGS_PAGE_ACTIVE_PAGE = 'setSettingPageActivePage',
};


type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType <Mutations[K]>
};

export type Actions = {
  [ActionTypes.LOAD_SIDEBAR_ELEMENTS](context: ActionArguments): Promise<Notification>,
  [ActionTypes.SAVE_SIDEBAR_EDITOR_ELEMENT](context: ActionArguments, editorComponent: ASidebarElement): Promise<Notification>,
  [ActionTypes.SET_SETTINGS_PAGE_ACTIVE_PAGE](context: ActionArguments, activePage: string): void,
  [ActionTypes.SHOW_SIDEBAR_ACTIVE_MENU](context: ActionArguments, whichComponent: string, showTextModal: boolean): void,
  [ActionTypes.SHOW_TEXT_MODAL](context: ActionArguments, showTextModal: boolean): void,
};

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.LOAD_SIDEBAR_ELEMENTS]({commit}): Promise<Notification> {
    const firestore = firebase.firestore();
    const notification: Notification = notificationDefault;
    return new Promise((resolve, reject) => {
      commit(MutationTypes.INITIALISE_ELEMENTS, true);
      firestore
        .collection(SIDEBARCOLLECTION)
        .get()
        .then(collection => {
          collection.forEach(sidebarElements => {
            const sidebarElement = sidebarElements.data() as SideBarElementFlattend;
            const component: ASidebarElement = getSideBarElement(sidebarElement);
            commit(MutationTypes.ADD_SIDEBAR_ELEMENT, component);
          });
          notification.status = 'ok';
          resolve(notification);
        })
        .catch(err => {
          notification.message = err;
          notification.status = 'Error';
          reject(notification);
        });
    });
  }
}

const getSideBarElement = (sidebarElement: SideBarElementFlattend): ASidebarElement => {
  const aSidebarElement = new ASidebarElement();
  aSidebarElement.classes = sidebarElement.classes;
  aSidebarElement.componentName = sidebarElement.componentName;
  aSidebarElement.componentRef = sidebarElement.componentRef;
  aSidebarElement.dimension = new ADimension(
    sidebarElement.dimension.height,
    sidebarElement.dimension.width,
    sidebarElement.dimension.units
  );
  aSidebarElement.location = new ALocation(
    sidebarElement.location.top,
    sidebarElement.location.left,
    sidebarElement.location.units,
  );
  aSidebarElement.isContainer = sidebarElement.isContainer;
  aSidebarElement.sidebarIcon = sidebarElement.sidebarIcon;
  aSidebarElement.type = sidebarElement.type;
  return aSidebarElement
}
