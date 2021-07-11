import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { MutationTree } from 'vuex';
import { State } from '../state/state';

export enum MutationTypes {
  SHOW_SNACKBAR = 'showSnackbar',
  SET_SNACKBAR_MESSAGE = 'setSnackbarMessage',
};

export type Mutations<S = State> = {
  [MutationTypes.SET_SNACKBAR_MESSAGE](state: S, snackbarMessage: SnackbarMessage): void,
  [MutationTypes.SHOW_SNACKBAR](state: S, toggle: boolean): void,
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SNACKBAR_MESSAGE](state, snackbarMessage) {
    state.snackbar = snackbarMessage;
  },

  [MutationTypes.SHOW_SNACKBAR](state, toggle) {
    state.showSnackbar = toggle;
  },
};
