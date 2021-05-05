import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex';
import { State, state } from './state/nav-menu';
import { Getters, getters } from './getters/getters';
import { Actions, actions, ActionTypes } from './actions/actions';
import { Mutations, mutations, MutationTypes  } from './mutations/mutations';
import { RootState } from '@/store';

export { State };

export type NavStore <S = State> =
  Omit<VuexStore<S>, 'commit'| 'getters' | 'dispatch'>
  & {
      commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]> (
        key: K,
        payload: P,
        options?: CommitOptions,
      ): ReturnType<Mutations[K]>
    }
  & {
      getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
      }
    }
  & {
    dispatch<K extends keyof Actions> (
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions,
      ): ReturnType<Actions[K]>
    };


export const NavMenuModule: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters,
};

export const NavMenuActionTypes = ActionTypes;
export const NavMenuMutationTypes = MutationTypes;
