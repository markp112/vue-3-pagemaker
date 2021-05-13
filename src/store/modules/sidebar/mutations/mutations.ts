import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import { SidebarComponentMenus } from '@/common/types/sidebar-component-menus/sidebar-component-menus';
import { MutationTree } from 'vuex';
import { State } from '../state/state';

export enum MutationTypes {
  ADD_SIDEBAR_ELEMENT = 'addSidebarElement',
  INITIALISE_ELEMENTS = 'initialiseElements',
  SET_SIDEBAR_VISIBILITY = 'setSidebarVisibility',
  SET_SIDEBAR_COMPONENT_MENU = 'setSidebarComponentMenu',
  SET_SHOW_TEXT_MODAL = 'setShowTextModal',
  SET_SETTINGS_PAGE_ACTIVE_PAGE = 'setSettingsPageActivePage',
};

export type Mutations<S = State> = {
  [MutationTypes.ADD_SIDEBAR_ELEMENT](state: S, sidebarElement: ASidebarElement): void,
  [MutationTypes.INITIALISE_ELEMENTS](state: S, payload: boolean): void,
  [MutationTypes.SET_SETTINGS_PAGE_ACTIVE_PAGE](state: S, activePageName: string): void,
  [MutationTypes.SET_SHOW_TEXT_MODAL](state: S, showTextModal: boolean): void,
  [MutationTypes.SET_SIDEBAR_COMPONENT_MENU](state: S, sidebarMenu: SidebarComponentMenus): void,
  [MutationTypes.SET_SIDEBAR_VISIBILITY](state: S, showSidebar: boolean): void,
};

export const mutations: MutationTree<State> & Mutations ={
  [MutationTypes.ADD_SIDEBAR_ELEMENT](state: State, sidebarElement: ASidebarElement) {
    state.sidebarElements.add(sidebarElement);
  },

  [MutationTypes.INITIALISE_ELEMENTS](state: State, payload: true) {
    state.sidebarElements.clear();
  },

  [MutationTypes.SET_SETTINGS_PAGE_ACTIVE_PAGE](state: State, activePageName: string) {
    state.settingsPageActivePage = activePageName;
  },

  [MutationTypes.SET_SHOW_TEXT_MODAL](state: State, showTextModal: boolean) {
    state.showTextModal = showTextModal;
  },

  [MutationTypes.SET_SIDEBAR_COMPONENT_MENU](state: State, sidebarMenu: SidebarComponentMenus) {
    state.sidebarComponent = sidebarMenu;
  },

  [MutationTypes.SET_SIDEBAR_VISIBILITY](state: State, showSidebar: boolean) {
    state.showSidebar = showSidebar;
  },
}
