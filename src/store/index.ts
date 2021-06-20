import { createStore, createLogger, Store as VuexStore } from "vuex";
import { NavMenuModule, NavStore as navMenuStore, NavMenuActionTypes, NavMenuMutationTypes } from './modules/nav-menu/';
import { AuthModule, Store as authStore, authActionTypes, authMutationTypes } from './modules/auth';
import { SiteModule, Store as siteStore, sitesActionTypes, sitesMutationTypes } from './modules/sites';
import { SidebarModule, Store as sidebarStore, sidebarActionTypes, sidebarMutationTypes } from './modules/sidebar';
import { PagesModule, Store as pagesStore, pagesActionTypes, pagesMutationTypes } from './modules/pages';
import { PageModule, Store as pageStore, pageActionTypes, pageMutationTypes } from './modules/page';
import { State as NavMenuState } from './modules/nav-menu/state/nav-menu';
import { State as AuthState } from './modules/auth/state/state';
import { State as SitesState } from './modules/sites/state/state';
import { State as SidebarState } from './modules/sidebar/state/state';
import { State as PagesState } from './modules/pages/state/state';
import { State as PageState } from './modules/page/state/state';

export type RootState = {
  navMenu: NavMenuState,
  auth: AuthState,
  sites: SitesState,
  sidebar: SidebarState,
  pages: PagesState,
  page: PageState,
}

export type Store = navMenuStore<Pick<RootState, 'navMenu'>>
  & siteStore<Pick<RootState, 'sites'>>
  & authStore<Pick<RootState, 'auth'>>
  & sidebarStore<Pick<RootState, 'sidebar'>>
  & pagesStore<Pick<RootState, 'pages'>>
  & pageStore<Pick<RootState, 'page'>>



export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production' ? [] : [createLogger()],
  modules: {
    NavMenuModule,
    AuthModule,
    SiteModule,
    SidebarModule,
    PagesModule,
    PageModule,

  }
});

export function useStore(): Store {
  return store as Store;
}

export default store;
export const AllActionTypes = {
  ...NavMenuActionTypes,
  ...authActionTypes,
  ...sitesActionTypes,
  ...sidebarActionTypes,
  ...pagesActionTypes,
  ...pageActionTypes,
};
export const AllMutationTypes = {
  ...NavMenuMutationTypes,
  ...authMutationTypes,
  ...sitesMutationTypes,
  ...sidebarMutationTypes,
  ...pagesMutationTypes,
  ...pageMutationTypes,
};
