import { createStore, createLogger, Store as VuexStore } from "vuex";
import { NavMenuModule, NavStore as navMenuStore, NavMenuActionTypes, NavMenuMutationTypes } from './modules/nav-menu/';
import { AuthModule, Store as authStore, authActionTypes, authMutationTypes } from './modules/auth';
import { SiteModule, Store as siteStore, sitesActionTypes, sitesMutationTypes } from './modules/sites';
import { State as NavMenuState } from './modules/nav-menu/state/nav-menu';
import { State as AuthState } from './modules/auth/state/state';
import { State as SitesState } from './modules/sites/state/state';

export type RootState = {
  navMenu: NavMenuState,
  auth: AuthState,
  sites: SitesState,
}

export type Store = navMenuStore<Pick<RootState, 'navMenu'>>
  & authStore<Pick<RootState, 'auth'>>
  & siteStore<Pick<RootState, 'sites'>>

export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production' ? [] : [createLogger()],
  modules: {
    NavMenuModule,
    AuthModule,
    SiteModule
  }
});


export function useStore(): Store {
  return store as Store;
}

export default store;
export const AllActionTypes = { ...NavMenuActionTypes, ...authActionTypes, ...sitesActionTypes };
export const AllMutationTypes = { ...NavMenuMutationTypes, ...authMutationTypes, ...sitesMutationTypes };
