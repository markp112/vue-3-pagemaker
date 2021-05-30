import { GetterTree } from 'vuex';
import { State } from '../state/state';
import { RootState } from '@/store';
import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';

export type Getters = {
  snackbarMessage(state: State): SnackbarMessage,
};

export const getters: GetterTree<State, RootState> & Getters = {
  snackbarMessage(state) {
    return state.snackbarMessage;
  },
};
