import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from '../state/state';

export type Getters = {
  getSidebarElements(state: State): ASidebarElement[],
  getSidebarContainers(state: State): ASidebarElement[],
  getSidebarAllItems(state: State): ASidebarElement[],
  showTextModal(state: State): boolean,
  getActiveSettingsPage(state: State): string,
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

  getSidebarAllItems(state) {
    return state.sidebarElements.componentDefinitions();
  },

  showTextModal(state): boolean {
    return state.showTextModal;
  },
}
