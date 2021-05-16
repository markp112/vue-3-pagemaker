import { RootState } from '@/store';
import { ActionContext } from 'vuex';
import { State } from '../state/state';
import { Mutations } from '../../nav-menu/mutations/mutations';
import { Notification, notificationDefault } from '@/models/notification/notification';
import { PalettesInterface } from '@/classes/settings/colour-palettes/model/colour-palette';
import { SiteDefaultsInterface } from '@/classes/settings/site-defaults/models/SiteDefaultSettings';

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
  [ActionTypes.FIREBASE_LOAD_COLOUR_PALETTE](context: ActionArguments): Promise<PalettesInterface | Notification>,
  [ActionTypes.FIREBASE_LOAD_SITE_DEFAULTS](context: ActionArguments, data: {userId: string, siteId: string}): Promise<SiteDefaultsInterface | Notification>,
  [ActionTypes.FIREBASE_SAVE_COLOUR_PALETTE](context: ActionArguments, data: {
    siteid: string,
    userid: string,
    colourPalette: PalettesInterface,
  }): Promise<Notification>,
  [ActionTypes.FIREBASE_SAVE_SITE_DEFAULTS](context: ActionArguments, siteDefaults: SiteDefaultsInterface): Promise<Notification>,
  [ActionTypes.STORAGE_SAVE_FILE](context: ActionArguments,file: File): Promise<Notification>,
}
