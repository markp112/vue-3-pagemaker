import { MutationTree } from 'vuex';
import { State } from '../state/state';
import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';

export enum MutationTypes {
  SET_SNACKBAR = 'setSnackbar',
  HIDE_SNACKBAR = 'hideSnackbar',
};

export type Mutations<S = State> = {
  [MutationTypes.SET_SNACKBAR](state: S, snackbar: SnackbarMessage): void,
  [MutationTypes.HIDE_SNACKBAR](state: S, show: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SNACKBAR](state: State, snackbar: SnackbarMessage) {
    state.snackbarMessage = snackbar;
    return state;
  },

  [MutationTypes.HIDE_SNACKBAR](state: State, show: boolean) {
    state.snackbarMessage.show = show;
    return state;
  },
};
