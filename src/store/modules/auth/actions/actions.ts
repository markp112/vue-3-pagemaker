import { ActionContext, ActionTree } from 'vuex';
import {  Mutations, MutationTypes } from '../mutations/mutations';
import { State } from '../state/state';
import { RootState } from '@/store';
import { AUser } from '@/classes/base/user/user';
import firebase from "firebase";

export enum ActionTypes {
  REGISTER_USER = 'REGISTER_USER',
  LOGIN = 'login',
  SET_USER_FROM_LOCAL_STORAGE = 'SET_USER_FROM_LOCAL_STORAGE',
  TOGGLE_IS_LOGGED_IN = 'toggleIsLoggedIn',
};

type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType <Mutations[K]>
};

export type Actions = {
  [ActionTypes.LOGIN](context: ActionArguments, user: AUser): void,
  [ActionTypes.REGISTER_USER](context: ActionArguments, payload: AUser): void,
  [ActionTypes.SET_USER_FROM_LOCAL_STORAGE](context: ActionArguments, payload: boolean): void,
  [ActionTypes.TOGGLE_IS_LOGGED_IN](context: ActionArguments, payload: boolean): void,
};


export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.TOGGLE_IS_LOGGED_IN]({ commit }, payload: boolean) {
    commit(MutationTypes.SET_SIGNED_IN, payload);
  },

  async [ActionTypes.LOGIN]({ commit }, user: AUser) {
    const INVALID_PASSWORD = 'auth/wrong-password';
    const USER_NOT_FOUND = 'auth/user-not-found';
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
          if (data.user) {
            const userData = data.user;
            const thisUser: AUser = new AUser(user.email, userData.uid, true, userData.refreshToken, userData.displayName);
            commit(MutationTypes.SET_USER, thisUser);
            resolve();
          }
        })
        .catch( err => {
          if (err.code === INVALID_PASSWORD || err.code === USER_NOT_FOUND) {
            reject('Login failed')
          }
        })
    });
  },

  async [ActionTypes.REGISTER_USER]({ commit }, user: AUser) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
          const thisUser: AUser = new AUser(user.email, '', true,'' , '');
          commit(MutationTypes.SET_USER, thisUser);
          resolve();
        })
        .catch(err=> {
          console.log(err);
          reject();
        })
    });
  },

  async [ActionTypes.SET_USER_FROM_LOCAL_STORAGE]({ commit }, payload: boolean) {
    const refreshToken = window.localStorage.getItem("pmToken");
    if (refreshToken !== null) {
      const email = window.localStorage.getItem("pmEmail");
      const id = window.localStorage.getItem("id");
      const thisUser: AUser = new AUser();
      thisUser.email = email === null ? "" : email;
      thisUser.isSignedIn = true;
      thisUser.id = id === null ? "" : id;
      thisUser.refreshToken = refreshToken;
      commit(MutationTypes.SET_USER, thisUser);
    }
  }
}
