import { GetterTree } from 'vuex';
import { State } from '../state/state';
import { RootState } from '@/store';
import { AUser } from '@/classes/base/user/user';

export type Getters = {
  user(state: State): AUser,
  isLoggedIn(state: State): boolean,
  isExistingUser(state: State): boolean,
};

export const getters: GetterTree<State, RootState> & Getters = {
  user(state) {
    return state.user;
  },

  isLoggedIn(state) {
    return state.user.isSignedIn;
  },

  isExistingUser(state: State) {
    const refreshToken = window.localStorage.getItem("pmToken");
    return refreshToken === null ? false : true;
  },
};
