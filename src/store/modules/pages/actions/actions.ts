import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import { ASitePage } from '@/classes/page/page';
import { Notification, notificationDefault } from '@/models/notification/notification';
import firebase from 'firebase';
import { SiteAndUser } from '@/common/types/site-and-user';
import { Page } from '@/classes/page/model/page';

export enum ActionTypes {
  ADD_A_NEW_PAGE = 'addAPage',
  UPDATE_CURRENT_PAGE = 'updateCurrentPage',
  LOAD_PAGES = 'loadPages',
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
        payload: Parameters<Mutations[K]>[1]
      ): ReturnType <Mutations[K]>
    } & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ActionTypes.ADD_A_NEW_PAGE]({ commit }: AugmentedActionContext, params: { page: ASitePage, siteAndUser: SiteAndUser}): Promise<Notification>,
  [ActionTypes.LOAD_PAGES]({ commit }: AugmentedActionContext, siteAndUser: SiteAndUser): Promise<Notification>,
  [ActionTypes.UPDATE_CURRENT_PAGE]({ commit, state }: AugmentedActionContext, page: string): void,

};

export const actions: ActionTree<State, RootState> & Actions = {

  [ActionTypes.ADD_A_NEW_PAGE]({ commit }, params:{page: ASitePage, siteAndUser: SiteAndUser}) {
    const notification: Notification = notificationDefault;
    return new Promise((resolve, reject) => {
      const firestore = firebase.firestore();
      const collectionId = getCollectionId(params.siteAndUser);
      const data = params.page.getPageDataAsObject();
      firestore
        .collection(collectionId)
        .doc(params.page.name)
        .set(data)
        .then(() => {
          commit(MutationTypes.ADD_PAGE, params.page);
          commit(MutationTypes.SET_CURRENT_PAGE, params.page);
          resolve(notification);
        })
        .catch(err => {
          notification.message = err;
          notification.status = 'Error';
          reject(notification);
        })
    })
  },

  [ActionTypes.LOAD_PAGES]({ commit }, siteAndUser: SiteAndUser) {
    const notification: Notification = notificationDefault;
    return new Promise((resolve, reject) => {
      const firestore = firebase.firestore();
      const collectionId = getCollectionId(siteAndUser);
      commit(MutationTypes.INITIALISE, true);
      firestore
        .collection(collectionId)
        .get()
        .then(collection => {
          collection.forEach(doc => {
            const data = doc.data() as Page;
            const page: ASitePage = new ASitePage(data);
            commit(MutationTypes.ADD_PAGE, page);
          });
          resolve(notification);
        })
        .catch(err => {
          console.log(err);
          notification.status = "Error";
          notification.message = err;
          reject(err);
        });
    });
  },

  [ActionTypes.UPDATE_CURRENT_PAGE]({ commit, state }, page: string) {
    const currentPage = state.pages.filter(item => item.name === page)[0];
    commit(MutationTypes.SET_CURRENT_PAGE, currentPage);
  },

}


function getCollectionId(siteAndUser: SiteAndUser): string {
  return `${siteAndUser.userId}${siteAndUser.siteId}::pages`;
}
