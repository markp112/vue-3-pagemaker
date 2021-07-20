import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import firebase from "firebase";
import { Notification, notificationDefault } from '@/models/notification/notification';
import { ComponentTypesString, SideBarElementFlattend } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { ALocation } from '@/classes/base/location/a-location';
import { SidebarComponentMenus } from '@/common/types/sidebar-component-menus/sidebar-component-menus';
import { SidebarComponents } from '@/classes/sidebar/builders/sidebar-panel-builder';

const SIDEBARCOLLECTION = 'component-definitions';

export enum ActionTypes {
  LOAD_SIDEBAR_ELEMENTS = 'loadSidebarElements',
  SAVE_SIDEBAR_EDITOR_ELEMENT = 'saveSidebarEditorElement',
  SHOW_SIDEBAR_ACTIVE_MENU = 'showSidebarActiveMenu',
  SET_SIDEBAR_MENU_BASED_ON_SELECTED_COMPONENT = 'setSidebarMenuBasedOnSelectedComponent',
  SHOW_TEXT_MODAL = 'showTextModal',
  SET_SETTINGS_PAGE_ACTIVE_PAGE = 'setSettingPageActivePage',
  SET_SHOW_SIDEBAR = 'setShowSidebar',
  SET_DRAG_DROP_EVENT_HANDLED = 'setDragDropEventHandled',
  SHOW_COMPONENT_ICONS = 'showComponentIcons',
};

type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType <Mutations[K]>
};

export type Actions = {
  [ActionTypes.LOAD_SIDEBAR_ELEMENTS](context: ActionArguments, payload: boolean): Promise<Notification>,
  [ActionTypes.SAVE_SIDEBAR_EDITOR_ELEMENT](context: ActionArguments, editorComponent: ASidebarElement): Promise<Notification>,
  [ActionTypes.SET_SETTINGS_PAGE_ACTIVE_PAGE](context: ActionArguments, activePage: string): void,
  [ActionTypes.SHOW_SIDEBAR_ACTIVE_MENU](context: ActionArguments, whichComponent: SidebarComponentMenus): void,
  [ActionTypes.SET_SIDEBAR_MENU_BASED_ON_SELECTED_COMPONENT](context: ActionArguments, componentType: ComponentTypesString): void,
  [ActionTypes.SHOW_TEXT_MODAL](context: ActionArguments, showTextModal: boolean): void,
  [ActionTypes.SET_SHOW_SIDEBAR](context: ActionArguments, showSidebar: boolean): void,
  [ActionTypes.SET_DRAG_DROP_EVENT_HANDLED](context: ActionArguments, isHandled: boolean): void,
  [ActionTypes.SHOW_COMPONENT_ICONS](context: ActionArguments, dummy: boolean): void,
};

export const actions: ActionTree<State, RootState> & Actions = {

  [ActionTypes.LOAD_SIDEBAR_ELEMENTS]({commit}, payload: boolean): Promise<Notification> {
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
          console.log('%c⧭', 'color: #733d00', err);
          notification.message = err;
          notification.status = 'Error';
          reject(notification);
        });
    });
  },

  [ActionTypes.SAVE_SIDEBAR_EDITOR_ELEMENT]({commit}, editorComponent: ASidebarElement):Promise<Notification> {
    const notification: Notification = notificationDefault;
    return new Promise((resolve, reject) => {
      const firestore = firebase.firestore();
      const data = editorComponent.toObject();
      firestore
        .collection(SIDEBARCOLLECTION)
        .doc(data.componentName)
        .set(data)
        .then(() => {
        commit(MutationTypes.ADD_SIDEBAR_ELEMENT, editorComponent);
        notification.status = 'ok';
        notification.message = 'Element saved'
          resolve(notification);
        })
        .catch(err => {
          console.log('%c⧭', 'color: #f200e2', err);
          notification.status = 'Error';
          notification.message = err;
          reject(notification);
        });
    });
  },

  [ActionTypes.SET_SETTINGS_PAGE_ACTIVE_PAGE]({commit}, activePageName: string) {
    commit(MutationTypes.SET_SETTINGS_PAGE_ACTIVE_PAGE, activePageName);
  },

  //set the active sidebar menu
  [ActionTypes.SHOW_SIDEBAR_ACTIVE_MENU]({commit}, whichComponent: SidebarComponentMenus) {
    commit(MutationTypes.SET_SIDEBAR_COMPONENT_MENU, whichComponent);
  },

  /**
   * @description - sets the side bar menu to show the icons for picking components this is the default menu
   * @param param0
   * @param dummy - dummy value is ignored
   */
  [ActionTypes.SHOW_COMPONENT_ICONS]({commit}, dummy: boolean) {
    commit(MutationTypes.SET_SIDEBAR_COMPONENT_MENU, 'sidebar-components');
  },

  [ActionTypes.SET_SIDEBAR_MENU_BASED_ON_SELECTED_COMPONENT]({commit}, componentType: ComponentTypesString) {
    switch(componentType) {
      case 'image':
        console.log('%c%s', 'color: #00ff88', 'image');
        commit(
          MutationTypes.SET_SIDEBAR_COMPONENT_MENU,
          'image-editor' as SidebarComponentMenus
        );
        break;
      case 'text':
        // if (editPenClicked) {
        //   this.context.commit('setShowTextModal', true);
        // } else {
        //   this.context.commit(
        //     'setSidebarEditor',
        //     'text-component-sidebar' as SidebarComponents
        //   );
        // }
        break;
      case 'jumbo':
        commit(
          MutationTypes.SET_SIDEBAR_COMPONENT_MENU,
          'container-editor' as SidebarComponentMenus
        );
        break;
      case 'pageTemplate':
        commit(
          MutationTypes.SET_SIDEBAR_COMPONENT_MENU,
          'container-editor' as SidebarComponentMenus
        );
        break;
      // case 'groupingContainer':
      //   this.context.commit(
      //     'setSidebarEditor',
      //     'container-editor' as SidebarComponents
      //   );
      //   break;
      case 'navBar':
        commit(
          MutationTypes.SET_SIDEBAR_COMPONENT_MENU,
          'container-editor' as SidebarComponentMenus
        );
        break;
      case 'button':
        commit(MutationTypes.SET_SIDEBAR_COMPONENT_MENU, 'button-editor');
        break;
    }
  },

  [ActionTypes.SHOW_TEXT_MODAL]({commit}, showTextModal: boolean) {
    commit(MutationTypes.SET_SHOW_TEXT_MODAL, showTextModal);
  },

  // toggle the side bar
  [ActionTypes.SET_SHOW_SIDEBAR]({commit}, showSidebar: boolean) {
    commit(MutationTypes.SET_SIDEBAR_VISIBILITY, showSidebar);
  },

  [ActionTypes.SET_DRAG_DROP_EVENT_HANDLED]({commit}, isHandled: boolean) {
    commit(MutationTypes.SET_DRAG_DROP_EVENT_HANDLED, isHandled);
  },
};

const getSideBarElement = (sidebarElement: SideBarElementFlattend): ASidebarElement => {
  const aSidebarElement = new ASidebarElement();
  aSidebarElement.classes = sidebarElement.classes;
  aSidebarElement.componentName = sidebarElement.componentName;
  aSidebarElement.componentRef = sidebarElement.componentRef;
  aSidebarElement.dimension = new ADimension(
    sidebarElement.dimension.height,
    sidebarElement.dimension.width,
  );
  aSidebarElement.location = new ALocation(
    sidebarElement.location.top,
    sidebarElement.location.left,
  );
  aSidebarElement.isContainer = sidebarElement.isContainer;
  aSidebarElement.sidebarIcon = sidebarElement.sidebarIcon;
  aSidebarElement.type = sidebarElement.type;
  aSidebarElement.tooltip = sidebarElement.tooltip;
  return aSidebarElement
}
