import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import { SidebarComponentMenus } from '@/common/types/sidebar-component-menus/sidebar-component-menus';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from '../state/state';

export type Getters = {
  getSidebarElements(state: State): ASidebarElement[],
  getSidebarContainers(state: State): ASidebarElement[],
  getSidebarAllItems(state: State): ASidebarElement[],
  getSidebarComponent(state: State): SidebarComponentMenus,
  showTextModal(state: State): boolean,
  getActiveSettingsPage(state: State): string,
  isShowSidebar(state: State): boolean,
  isDragDropEventHandled(state: State): boolean,
};

export const getters: GetterTree<State, RootState> & Getters = {
  getSidebarElements(state) {
    return state.sidebarElements.pageElementsOnly();
  },

  getSidebarContainers(state) {
    return state.sidebarElements.containersOnly();
  },

  getActiveSettingsPage(state) {
    return state.settingsPageActivePage;
  },

  getSidebarComponent(state) {
    return state.sidebarComponent;
  },

  getSidebarAllItems(state) {
    return state.sidebarElements.componentDefinitions();
  },

  showTextModal(state): boolean {
    return state.showTextModal;
  },

  isShowSidebar(state): boolean {
    return state.showSidebar;
  },

  isDragDropEventHandled(state): boolean {
    return state.dragDropEventHandled;
  }
}
