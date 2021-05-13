import { ActionContext, ActionTree } from 'vuex';
import {  Mutations, MutationTypes } from '../mutations/mutations';
import { State } from '../state/state';
import { RootState } from '@/store';
import { ASite } from '@/classes/base/sites/ASite';
import { useStore } from '@/store';
import { Notification, notificationDefault } from '@/models/notification/notification'
import firebase from "firebase";
import { Site } from '@/classes/base/sites/model';

interface FirebaseData {
  [key: string]: any;
}

export enum ActionTypes {
  SAVE_SITE = 'saveSite',
  LOAD_SITES = 'loadSites',
  SET_CURRENT_SITE = 'setCurrentSite',
  UPDATE_SITE = 'updateSite',
};

type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType <Mutations[K]>
};

export type Actions = {
  [ActionTypes.LOAD_SITES](context: ActionArguments, userId: string): Promise<Notification>,
  [ActionTypes.SAVE_SITE](context: ActionArguments, site: ASite): Promise<Notification>,
  [ActionTypes.SET_CURRENT_SITE](context: ActionArguments, siteId: string): void,
  [ActionTypes.UPDATE_SITE](context: ActionArguments, site: ASite): void,
};

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.SAVE_SITE]({commit}, site: ASite): Promise<Notification> {
    const notification: Notification = notificationDefault;
    return new Promise((resolve, reject) => {
      const siteToStore: FirebaseData = site.toObject();
      siteToStore.userId = useStore().getters.user.id;
      const documentId = getDocumentId(siteToStore.userId);
      const collectionId = getCollectionId(siteToStore.siteId);
      const firestore = firebase.firestore();
      firestore
        .collection(collectionId)
        .doc(documentId)
        .set(siteToStore)
        .then(() => {
          commit(MutationTypes.ADD_SITE, site);
          commit(MutationTypes.SET_SITE, site.siteId);
          notification.message = 'Site saved';
          notification.status = 'ok';
          resolve(notification);
        })
        .catch(err => {
          console.log(err);
          notification.status = 'Error';
          notification.message = err;
          reject(err);

        })
    })
  },

  [ActionTypes.LOAD_SITES]({commit}, userId: string): Promise<Notification> {
    const notification = notificationDefault;
    return new Promise((resolve, reject) => {
      const collectionId = getCollectionId(userId);
      const firestore = firebase.firestore();
      firestore
        .collection(collectionId)
        .get()
        .then(result => {
          commit(MutationTypes.INITIALISE, true);
          result.forEach(doc => {
            const site: FirebaseData = doc.data() as Site;
            const aSite = new ASite(site.siteId, site.name, site.created);
            if (site.publised) aSite.published = site.publised;
            if (site.image) aSite.image = site.image;
            if (site.url) aSite.url = site.url;
            if (site.description) aSite.description = site.description;
            commit(MutationTypes.ADD_SITE, aSite);
          });
          notification.message = '';
          notification.status = 'ok';
          resolve(notification);
        })
        .catch(err => {
          console.log(err);
          notification.status = 'Error';
          notification.message = err;
          reject(notification);
        });
    });
  },

  [ActionTypes.SET_CURRENT_SITE]({commit}, siteid: string) {
    commit(MutationTypes.SET_SITE, siteid);
  },

  [ActionTypes.UPDATE_SITE]({commit}, site: ASite) {
    throw new Error('pending implementation')
  }
}

const getDocumentId = function(id: string): string {
  return `site::${id}`;
};

const getCollectionId = function(id: string): string {
  return `sites::${id}`;
}
