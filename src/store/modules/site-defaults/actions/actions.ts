import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations } from '../mutations/mutations';
import { Notification, notificationDefault } from '@/models/notification/notification';
import { PalettesInterface } from '@/classes/settings/colour-palettes/model/colour-palette';
import { siteDefaultSettings, SiteDefaultsInterface } from '@/classes/settings/site-defaults/models/SiteDefaultSettings';
import firebase from 'firebase';

const SITE_COLOUR_PALETTE = 'siteColourPalatte';
const notification: Notification = notificationDefault;

export enum ActionTypes {
  STORAGE_SAVE_FILE = 'storageSaveFile',
  FIREBASE_SAVE_COLOUR_PALETTE = 'firebaseSaveColourPalette',
  FIREBASE_LOAD_COLOUR_PALETTE = 'firebaseLoadColourPalette',
  FIREBASE_SAVE_SITE_DEFAULTS = 'firebaseSaveSiteDefaults',
  FIREBASE_LOAD_SITE_DEFAULTS ='firebaseLoadSiteDefaults',
};

type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType <Mutations[K]>
};

export type Actions = {
  [ActionTypes.FIREBASE_LOAD_COLOUR_PALETTE](context: ActionArguments, data:{ userId: string, siteId: string }): Promise<PalettesInterface | Notification>,
  [ActionTypes.FIREBASE_LOAD_SITE_DEFAULTS](context: ActionArguments, data: { userId: string, siteId: string }): Promise<SiteDefaultsInterface | Notification>,
  // [ActionTypes.FIREBASE_SAVE_COLOUR_PALETTE](context: ActionArguments, data: {
  //   siteid: string,
  //   userid: string,
  //   colourPalette: PalettesInterface,
  // }): Promise<Notification>,
  // [ActionTypes.FIREBASE_SAVE_SITE_DEFAULTS](context: ActionArguments, siteDefaults: SiteDefaultsInterface): Promise<Notification>,
  // [ActionTypes.STORAGE_SAVE_FILE](context: ActionArguments,file: File): Promise<Notification>,
};

export const actions: ActionTree<State, RootState> & Actions = {

  [ActionTypes.FIREBASE_LOAD_COLOUR_PALETTE](
      {},
      data: { userId: string, siteId: string }
  ): Promise<PalettesInterface | Notification> {
    const collectionId = getCollectionId(data.siteId, data.userId);
    return new Promise((resolve, reject) => {
      const firestore = firebase.firestore();
      firestore
        .collection(collectionId)
        .doc(SITE_COLOUR_PALETTE)
        .get()
        .then(response => {
          const docData = response.data();
          resolve(docData as PalettesInterface);
        })
        .catch(err => {
          notification.status = "Error";
          notification.message = err;
          console.log(err);
          reject(err);
        })
    })
  },


  [ActionTypes.FIREBASE_LOAD_SITE_DEFAULTS]({}, data: { userId: string, siteId: string }): Promise<SiteDefaultsInterface | Notification> {
    let siteDefaults: SiteDefaultsInterface;
    return new Promise((resolve, reject) => {
      const collectionId = getCollectionId(data.siteId, data.userId);
      const firestore = firebase.firestore();
      firestore
        .collection(collectionId)
        .doc("siteSettings")
        .get()
        .then(response => {
          const docData = response.data();
          siteDefaults =
            docData !== undefined
              ? (docData as SiteDefaultsInterface)
              : siteDefaultSettings;
          resolve(siteDefaults);
        })
        .catch(err => {
          notification.status = "Error";
          notification.message = err;
          reject(notification);
        });
    });
  }

}

const getCollectionId = (siteId: string, userId: string): string => {
  return `${userId}${siteId}::settings`
}
