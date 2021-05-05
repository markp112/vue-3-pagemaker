import { MutationTree } from 'vuex';
import { AUser } from '@/classes/base/user/user';
import { State } from '../state/state';

export enum MutationTypes {
  SET_USER = 'setUser',
  SET_SIGNED_IN = 'setSignedIn',
};

export type Mutations<S = State> = {
  [MutationTypes.SET_SIGNED_IN](state: S, payload: boolean): void,
  [MutationTypes.SET_USER](state: S, payload: AUser): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SIGNED_IN](state: State, payload: boolean) {
    state.user.isSignedIn = payload;
    return state;
  },

  [MutationTypes.SET_USER](state: State, payload: AUser) {
    state.user = payload;
    return state;
  },
}