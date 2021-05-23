import {  DispatchOptions, Module, Store as VuexStore } from 'vuex';
import { State, state } from './state/state';
// import { Getters, getters } from './getters/getters';
import { Actions, actions, ActionTypes } from './actions/actions';
// import { Mutations, mutations, MutationTypes  } from './mutations/mutations';
import { RootState } from '@/store';

// export { State };

export type Store <S = State> =
  Omit<VuexStore<S>, 'dispatch'>

  & {
    dispatch<K extends keyof Actions> (
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions,
      ): ReturnType<Actions[K]>
    };


export const SiteDefaultsModule: Module<State, RootState> = {
  actions,
};

export const siteDefaultsActionTypes = ActionTypes;
