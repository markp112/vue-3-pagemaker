import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';

export enum ActionTypes {
  SHOW_SNACKBAR = 'showSnackbar',
  TOGGLE_SNACKBAR = 'hideSnackbar',
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
        payload: Parameters<Mutations[K]>[1]
      ): ReturnType <Mutations[K]>
    } & Omit<ActionContext<State, RootState>, 'commit'>;


export interface Actions  {
  [ActionTypes.SHOW_SNACKBAR]({commit}: AugmentedActionContext, message: SnackbarMessage): void,
  [ActionTypes.TOGGLE_SNACKBAR]({commit}: AugmentedActionContext, toggle: boolean): void,
};

export const actions : ActionTree<State, RootState> & Actions = {
  
  [ActionTypes.TOGGLE_SNACKBAR]({ commit }, toggle: boolean ) {
    commit(MutationTypes.HIDE_SNACKBAR, toggle);
  },

  [ActionTypes.SHOW_SNACKBAR]({ commit }, message: SnackbarMessage) {
    commit(MutationTypes.SET_SNACKBAR, message);
  },
}
