import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import { SidebarElements } from '@/classes/sidebar-element/sidebar-elements/sidebar-elements';
import { SidebarComponentMenus } from '@/common/types/sidebar-component-menus/sidebar-component-menus';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from '../state/state';

export type Getters = {
  getSidebarElements(state: State): ASidebarElement[],
  getSidebarContainers(state: State): ASidebarElement[],
  getSidebarAllItems(state: State): ASidebarElement[],
  getSidebarAllElements(state: State): SidebarElements,
  getSidebarElement(state: State): (componentName: string) => ASidebarElement | undefined,
  showTextModal(state: State): boolean,
  getSidebarComponent(state: State): SidebarComponentMenus,
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

  getSidebarAllElements(state)  {
    return  state.sidebarElements;
  },

  getSidebarElement:(state: State) => (componentName: string): ASidebarElement | undefined => {
    return  state.sidebarElements.getComponentByName(componentName);
  },
  // getPageComponent: (state: State) => (componentName: string): PageElementClasses => {
  //   const element = state.pageElements.filter(pageElement => pageElement.name === componentName)[0];
  //   return element || undefined;
  // }
  showTextModal(state): boolean {
    return state.showTextModal;
  },

  isShowSidebar(state): boolean {
    return state.showSidebar;
  },

  isDragDropEventHandled(state): boolean {
    return state.dragDropEventHandled;
  },
}
