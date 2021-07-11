import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';

export enum ActionTypes {
  SET_SNACKBAR_MESSAGE = 'setSnackbarMessage',
  SHOW_SNACKBAR = 'showSnackbar',
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
        payload: Parameters<Mutations[K]>[1]
      ): ReturnType <Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ActionTypes.SET_SNACKBAR_MESSAGE]({ commit }: AugmentedActionContext, snackbarMessage: SnackbarMessage): void,
  [ActionTypes.SHOW_SNACKBAR]({ commit }: AugmentedActionContext, toggle: boolean): void,
};

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.SET_SNACKBAR_MESSAGE]({ commit }, snackbarMessage) {
    commit(MutationTypes.SET_SNACKBAR_MESSAGE, snackbarMessage);
  },

  [ActionTypes.SHOW_SNACKBAR]({ commit }, toggle) {
    console.log('%c%s', 'color: #997326', 'SHOW_SNACKBAR', toggle);
    commit(MutationTypes.SHOW_SNACKBAR, toggle);
  },
};
