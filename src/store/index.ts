import { createStore, createLogger } from "vuex";
import { NavMenuModule, Store as navMenuStore, NavMenuActionTypes, NavMenuMutationTypes } from './modules/nav-menu/';
import { AuthModule, Store as authStore, authActionTypes, authMutationTypes } from './modules/auth';
import { State as NavMenuState } from './modules/nav-menu/state/nav-menu';
import { State as AuthState } from './modules/auth';





export type State = {
  navMenu: NavMenuState,
  auth: AuthState
}

export type Store = navMenuStore<Pick<State, 'navMenu'>> &
  authStore<Pick<State, 'auth'>>

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
export const AllActionTypes = {...NavMenuActionTypes, ...authActionTypes};
export const AllMutationTypes = {...NavMenuMutationTypes, ...authMutationTypes};
