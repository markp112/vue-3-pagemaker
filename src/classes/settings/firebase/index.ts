import firebase from 'firebase';
import { PalettesInterface } from '../colour-palettes/model/colour-palette';
import { Notification, notificationDefault } from '@/models/notification/notification';
import { SiteAndUser } from '@/common/types/site-and-user';
import { SiteDefaultsInterface } from '../site-defaults/models';
import { siteDefaultSettings } from '../site-defaults/models/defaults';

const PALETTE = 'siteColourPalatte';
const SETTINGS = '::settings';
const SITE_SETTINGS = 'siteSettings';
const notification: Notification = notificationDefault;

export function storeSiteColourPalette(
  siteAndUser: SiteAndUser,
  colourPalette: PalettesInterface
): Promise<Notification> {
    return new Promise((resolve, reject) => {
      const firestore = firebase.firestore();
      firestore
        .collection(getCollectionId(siteAndUser))
        .doc(PALETTE)
        .set(colourPalette)
        .then(() => {
          notification.message = "Palettes saved";
          notification.status = "ok";
          resolve(notification);
        })
        .catch(err => {
          console.log("err");
          notification.status = "Error";
          notification.message = err;
          reject(notification);
        });
    });
}

export function loadSitePalette(
  siteAndUser: SiteAndUser
): Promise<PalettesInterface | Notification> {
    const collectionId = getCollectionId(siteAndUser);
    return new Promise((resolve, reject) => {
      const firestore = firebase.firestore();
      firestore
        .collection(collectionId)
        .doc(PALETTE)
        .get()
        .then(response => {
          const docData = response.data();
          resolve(docData as PalettesInterface);
        })
        .catch(err => {
          console.log("err");
          notification.status = "Error";
          notification.message = err;
          reject(notification);
        });
    });
}

export function firestoreGetSiteDefaultSettings(siteAndUser: SiteAndUser): Promise<SiteDefaultsInterface | Notification> {
  let siteDefaults: SiteDefaultsInterface;
  return new Promise((resolve, reject) => {
    const firestore = firebase.firestore();
    const collectionId = getCollectionId(siteAndUser);
    firestore
      .collection(collectionId)
      .doc(SITE_SETTINGS)
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

export function firestoreSaveSiteDefaults(
  siteAndUser: SiteAndUser,
  siteDefaults: SiteDefaultsInterface
): Promise<Notification> {
  return new Promise((resolve, reject) => {
    const collectionId = getCollectionId(siteAndUser);
    const firestore = firebase.firestore();
    firestore
      .collection(collectionId)
      .doc(SITE_SETTINGS)
      .set(siteDefaults)
      .then(() => {
        //update the site defaults
        notification.message = "Defaults saved";
        notification.status = "ok";
        resolve(notification);
      })
      .catch(err => {
        notification.status = "Error";
        notification.message = err;
        reject(notification);
      });
  });
}

function getCollectionId(siteAndUser: SiteAndUser) {
  return `${siteAndUser.userId}${siteAndUser.siteId}${SETTINGS}`;

}
