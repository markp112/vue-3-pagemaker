import { createStore, createLogger, Store as VuexStore } from "vuex";
import { NavMenuModule, NavStore as navMenuStore, NavMenuActionTypes, NavMenuMutationTypes } from './modules/nav-menu/';
import { AuthModule, Store as authStore, authActionTypes, authMutationTypes } from './modules/auth';
import { State as NavMenuState } from './modules/nav-menu/state/nav-menu';
import { State as AuthState } from './modules/auth/state/state';

export type RootState = {
  navMenu: NavMenuState,
  auth: AuthState
}

export type Store = navMenuStore<Pick<RootState, 'navMenu'>> &
  authStore<Pick<RootState, 'auth'>>

export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production' ? [] : [createLogger()],
  modules: {
    NavMenuModule,
    AuthModule,
  }
});


export function useStore(): Store {
  return store as Store;
}

export default store;
export const AllActionTypes = { ...NavMenuActionTypes, ...authActionTypes };
export const AllMutationTypes = { ...NavMenuMutationTypes, ...authMutationTypes };
