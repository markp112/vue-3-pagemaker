import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from '../state/state';

export type Getters = {
  snackbarMessage(state: State): SnackbarMessage,
  showSnackbar(state: State): boolean,
};

export const getters: GetterTree<State, RootState> & Getters = {

  snackbarMessage(state) {
    return state.snackbar;
  },

  showSnackbar(state) {
    return state.showSnackbar;
  }
}
